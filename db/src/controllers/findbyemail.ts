import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

const findByEmail: any = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const email = req.query.email as string;

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if(!findUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, result: findUser });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

export default findByEmail;
