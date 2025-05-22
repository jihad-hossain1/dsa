import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

import fs from "fs";
import path from "path";

// Configuration constants
export const MAX_USERS_LIMIT = 100000;
export const BATCH_SIZE = 1000; // Number of users to create in each batch

// Logger configuration with file storage
export const logger = {
  logDir: path.join(__dirname, "../logs"),
  logFile: `batch-users-${new Date().toISOString().split("T")[0]}.log`,

  createLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  },

  writeLog(level: string, message: string, data?: any, execTime?: number) {
    this.createLogDir();
    const timestamp = new Date().toISOString();
    const execTimeStr = execTime ? ` [Execution time: ${execTime}ms]` : "";
    const logEntry = `[${level}] ${timestamp}${execTimeStr} - ${message} ${
      data ? JSON.stringify(data) : ""
    }\n`;

    fs.appendFileSync(path.join(this.logDir, this.logFile), logEntry);
    console[level.toLowerCase()](logEntry);
  },

  info(message: string, data?: any, execTime?: number) {
    this.writeLog("INFO", message, data, execTime);
  },

  error(message: string, error?: any) {
    this.writeLog("ERROR", message, {
      error: error?.message || error,
      stack: error?.stack,
    });
  },

  startTimer() {
    return process.hrtime();
  },

  endTimer(start: [number, number]) {
    const diff = process.hrtime(start);
    return Math.round((diff[0] * 1e9 + diff[1]) / 1e6); // Convert to milliseconds
  },
};

// Helper function to generate random name and email
export function generateRandomEmailWithName() {
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
  const firstName = nameParts
    .slice(0, Math.floor(nameParts.length / 2))
    .join("");
  const lastName = nameParts.slice(Math.floor(nameParts.length / 2)).join("");

  // Capitalize first letter of each name part for a proper name format
  const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`;

  // Return the full name and email
  return {
    fullName,
    email,
  };
}

// Helper function to capitalize the first letter of a string
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to generate batch of users
export function generateUsersBatch(size: number) {
  const users: { name: string; email: string }[] = [];
  for (let i = 0; i < size; i++) {
    const { fullName, email } = generateRandomEmailWithName();

    users.push({ name: fullName, email });
  }
  return users;
}

// Helper function to process users in batches
export async function processBatch(
  users: { name: string; email: string }[]
): Promise<any> {
  try {
    const values = users
      .map(
        (user: { name: string; email: string }) =>
          Prisma.sql`(${user.name}, ${user.email})`
      )
      .join(",");

    return await prisma.$queryRaw`
            INSERT INTO user (name, email) 
            VALUES ${Prisma.sql([values])}
        `;
  } catch (error) {
    console.error("Batch processing error:", error);
    throw error;
  }
}
