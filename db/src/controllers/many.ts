import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

// Maximum limit of users that can be generated
const MAX_USERS_LIMIT = 100000; // You can change this number as per your requirements

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

// Main function to create many users
const createMany: any = async (req: Request, res: Response, next: NextFunction) => {
    const { amount } = req.body;

    try {
        // Validate the number of users and apply the maximum limit
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid number of users to create"
            });
        }

        // Apply the limit
        const usersToCreate = Math.min(amount, MAX_USERS_LIMIT);

        let users: any = [];

        // Generate random users
        for (let i = 0; i < usersToCreate; i++) {
            const { fullName, email } = generateRandomEmailWithName();
            users.push({ name: fullName, email });
        }

        // Create users in the database
        const createdUsers = await prisma.user.createMany({
            data: users
        });

        return res.status(200).json({
            success: true,
            data: createdUsers
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: (error as Error).message
        });
    }
};

export default createMany;
