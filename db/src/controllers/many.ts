import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import {
  logger,
  MAX_USERS_LIMIT,
  BATCH_SIZE,
  generateUsersBatch,
} from "./helpers";

export const createMany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const totalTimer = logger.startTimer();
  const { amount } = req.body;
  logger.info(`Starting batch creation request`, { amount });

  try {
    if (!amount || amount <= 0) {
      logger.error(`Invalid amount provided`, { amount });
      return res.status(400).json({
        success: false,
        message: "Please provide a valid number of users to create",
      });
    }

    const usersToCreate = Math.min(amount, MAX_USERS_LIMIT);
    const batchCount = Math.ceil(usersToCreate / BATCH_SIZE);

    logger.info(`Initializing batch process`, {
      usersToCreate,
      batchCount,
      batchSize: BATCH_SIZE,
    });

    let totalCreated = 0;
    const batchResults: { batchNumber: number; usersCreated: number }[] = [];

    const batchTimer = logger.startTimer();
    await prisma.$transaction(
      async (tx) => {
        for (let i = 0; i < batchCount; i++) {
          const batchStartTime = logger.startTimer();
          const currentBatchSize = Math.min(
            BATCH_SIZE,
            usersToCreate - i * BATCH_SIZE
          );

          logger.info(`Processing batch ${i + 1}/${batchCount}`, {
            currentBatchSize,
          });

          const usersBatch = generateUsersBatch(currentBatchSize);
          const values = usersBatch.map((user) => [user.name, user.email]);

          try {
            await tx.$executeRaw`
                        INSERT INTO user (name, email) 
                        VALUES ${Prisma.join(
                          values.map(
                            (value) => Prisma.sql`(${Prisma.join(value)})`
                          )
                        )}
                    `;

            totalCreated += currentBatchSize;
            batchResults.push({
              batchNumber: i + 1,
              usersCreated: currentBatchSize,
            });

            const batchExecTime = logger.endTimer(batchStartTime);
            logger.info(
              `Completed batch ${i + 1}`,
              {
                batchNumber: i + 1,
                usersCreated: currentBatchSize,
                totalCreated,
              },
              batchExecTime
            );
          } catch (error) {
            logger.error(`Error in batch ${i + 1}`, error);
            throw error;
          }

          if (i < batchCount - 1) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }
      },
      {
        maxWait: 60000,
        timeout: 120000,
      }
    );

    const totalExecTime = logger.endTimer(batchTimer);
    logger.info(
      `Batch creation completed`,
      {
        totalUsersRequested: usersToCreate,
        totalCreated,
        batchCount,
      },
      totalExecTime
    );

    return res.status(200).json({
      success: true,
      data: {
        totalUsersRequested: usersToCreate,
        totalUsersCreated: totalCreated,
        batchResults,
        batchSize: BATCH_SIZE,
        totalBatches: batchCount,
        executionTimeMs: totalExecTime,
      },
    });
  } catch (error) {
    const totalExecTime = logger.endTimer(totalTimer);
    logger.error(`Batch creation failed`, {
      error,
      executionTimeMs: totalExecTime,
    });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
      details:
        error instanceof Prisma.PrismaClientKnownRequestError
          ? error.code
          : undefined,
      executionTimeMs: totalExecTime,
    });
  }
};

// Progress monitoring endpoint (optional)
export const getProgress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const totalUsers = await prisma.$queryRaw`SELECT COUNT(*) FROM user`;
    return res.status(200).json({
      success: true,
      currentUserCount: totalUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get progress",
      error: (error as Error).message,
    });
  }
};
