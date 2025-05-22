import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

interface User {
  id: number;
  // ... add other user fields based on your schema
}

// Main function to get users with pagination
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        // Calculate the skip value
        const skip = (page - 1) * limit;

        // Combine both queries into a single database call using Prisma.sql
        const [users, countResult] = await prisma.$transaction([
            prisma.$queryRaw<User[]>(
                Prisma.sql`SELECT * FROM user LIMIT ${limit} OFFSET ${skip}`
            ),
            prisma.$queryRaw<[{ count: bigint }]>(
                Prisma.sql`SELECT COUNT(*) as count FROM user`
            )
        ]);

        const totalUsersCount = Number(countResult[0].count);
        const totalPages = Math.ceil(totalUsersCount / limit);

        return res.status(200).json({
            success: true,
            result: users,
            pagination: {
                page,
                limit,
                totalPages,
                totalUsers: totalUsersCount
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: (error as Error).message
        });
    }
};

export default getUsers;
