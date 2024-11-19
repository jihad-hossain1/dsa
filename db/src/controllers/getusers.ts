import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

// Main function to get users with pagination
const getUsers: any = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 users per page if not provided

    try {
        // Calculate the skip value (where the query should start)
        const skip = (page - 1) * limit;

        // Fetch the users with pagination
        const users = await prisma.user.findMany({
            skip: skip,
            take: limit, // Limit the number of results returned
            orderBy: {
                id: 'desc' // Order by id or any other field you wish
            }
        });

        // Get the total count of users (for pagination info)
        const totalUsers = await prisma.user.count();

        // Calculate total pages for pagination
        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(200).json({
            success: true,
            result: users,
            pagination: {
                page,
                limit,
                totalPages,
                totalUsers
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
