import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import fs from 'fs';
import path from 'path';

// Configuration constants
const MAX_USERS_LIMIT = 100000;
const BATCH_SIZE = 1000; // Number of users to create in each batch

// Logger configuration with file storage
const logger = {
    logDir: path.join(__dirname, '../logs'),
    logFile: `batch-users-${new Date().toISOString().split('T')[0]}.log`,
    
    createLogDir() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    },

    writeLog(level: string, message: string, data?: any, execTime?: number) {
        this.createLogDir();
        const timestamp = new Date().toISOString();
        const execTimeStr = execTime ? ` [Execution time: ${execTime}ms]` : '';
        const logEntry = `[${level}] ${timestamp}${execTimeStr} - ${message} ${data ? JSON.stringify(data) : ''}\n`;
        
        fs.appendFileSync(path.join(this.logDir, this.logFile), logEntry);
        console[level.toLowerCase()](logEntry);
    },

    info(message: string, data?: any, execTime?: number) {
        this.writeLog('INFO', message, data, execTime);
    },

    error(message: string, error?: any) {
        this.writeLog('ERROR', message, {
            error: error?.message || error,
            stack: error?.stack
        });
    },

    startTimer() {
        return process.hrtime();
    },

    endTimer(start: [number, number]) {
        const diff = process.hrtime(start);
        return Math.round((diff[0] * 1e9 + diff[1]) / 1e6); // Convert to milliseconds
    }
};

// Helper function to generate random name and email
function generateRandomEmailWithName() {
    // Generate random string for the email username
    const randomString = Math.random().toString(36).substring(2, 10);

    // Email domains
    const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    // Combine to create the full email
    const email = `${randomString}@${randomDomain}`;

    // Convert the random string to a plausible name
    const nameParts = randomString.split("");
    
    // Generate a first and last name by splitting the random string
    const firstName = nameParts.slice(0, Math.floor(nameParts.length / 2)).join('');
    const lastName = nameParts.slice(Math.floor(nameParts.length / 2)).join('');

    // Capitalize first letter of each name part for a proper name format
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`;

    // Return the full name and email
    return {
        fullName,
        email
    };
}

// Helper function to capitalize the first letter of a string
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to generate batch of users
function generateUsersBatch(size: number) {
    const users: { name: string; email: string; }[] = [];
    for (let i = 0; i < size; i++) {
        const { fullName, email } = generateRandomEmailWithName();
        users.push({ name: fullName, email });
    }
    return users;
}

// Helper function to process users in batches
export async function processBatch(users: { name: string; email: string; }[]): Promise<any> {
    try {
        const values = users.map((user: { name: string; email: string }) => 
            Prisma.sql`(${user.name}, ${user.email})`
        ).join(',');

        return await prisma.$queryRaw`
            INSERT INTO user (name, email) 
            VALUES ${Prisma.sql([values])}
        `;
    } catch (error) {
        console.error('Batch processing error:', error);
        throw error;
    }
}

// Main function to create many users with batch processing
export const createMany = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const totalTimer = logger.startTimer();
    const { amount } = req.body;
    logger.info(`Starting batch creation request`, { amount });

    try {
        if (!amount || amount <= 0) {
            logger.error(`Invalid amount provided`, { amount });
            return res.status(400).json({
                success: false,
                message: "Please provide a valid number of users to create"
            });
        }

        const usersToCreate = Math.min(amount, MAX_USERS_LIMIT);
        const batchCount = Math.ceil(usersToCreate / BATCH_SIZE);
        
        logger.info(`Initializing batch process`, {
            usersToCreate,
            batchCount,
            batchSize: BATCH_SIZE
        });

        let totalCreated = 0;
        const batchResults: { batchNumber: number; usersCreated: number; }[] = [];

        const batchTimer = logger.startTimer();
        await prisma.$transaction(async (tx) => {
            for (let i = 0; i < batchCount; i++) {
                const batchStartTime = logger.startTimer();
                const currentBatchSize = Math.min(
                    BATCH_SIZE,
                    usersToCreate - (i * BATCH_SIZE)
                );

                logger.info(`Processing batch ${i + 1}/${batchCount}`, { currentBatchSize });

                const usersBatch = generateUsersBatch(currentBatchSize);
                const values = usersBatch.map(user => [user.name, user.email]);

                try {
                    await tx.$executeRaw`
                        INSERT INTO user (name, email) 
                        VALUES ${Prisma.join(values.map(value => Prisma.sql`(${Prisma.join(value)})`))}
                    `;

                    totalCreated += currentBatchSize;
                    batchResults.push({
                        batchNumber: i + 1,
                        usersCreated: currentBatchSize
                    });

                    const batchExecTime = logger.endTimer(batchStartTime);
                    logger.info(`Completed batch ${i + 1}`, { 
                        batchNumber: i + 1, 
                        usersCreated: currentBatchSize,
                        totalCreated 
                    }, batchExecTime);

                } catch (error) {
                    logger.error(`Error in batch ${i + 1}`, error);
                    throw error;
                }

                if (i < batchCount - 1) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        }, {
            maxWait: 60000,
            timeout: 120000,
        });

        const totalExecTime = logger.endTimer(batchTimer);
        logger.info(`Batch creation completed`, {
            totalUsersRequested: usersToCreate,
            totalCreated,
            batchCount
        }, totalExecTime);

        return res.status(200).json({
            success: true,
            data: {
                totalUsersRequested: usersToCreate,
                totalUsersCreated: totalCreated,
                batchResults,
                batchSize: BATCH_SIZE,
                totalBatches: batchCount,
                executionTimeMs: totalExecTime
            }
        });

    } catch (error) {
        const totalExecTime = logger.endTimer(totalTimer);
        logger.error(`Batch creation failed`, {
            error,
            executionTimeMs: totalExecTime
        });
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: (error as Error).message,
            details: error instanceof Prisma.PrismaClientKnownRequestError ? error.code : undefined,
            executionTimeMs: totalExecTime
        });
    }
};

// Progress monitoring endpoint (optional)
export const getProgress = async (req: Request, res: Response): Promise<Response> => {
    try {
        const totalUsers = await prisma.$queryRaw`SELECT COUNT(*) FROM user`;
        return res.status(200).json({
            success: true,
            currentUserCount: totalUsers
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get progress",
            error: (error as Error).message
        });
    }
};


