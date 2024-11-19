import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

const getUser: any = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({ success: true, result: findUser });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
};

export default getUser;
