
import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

 const createUser: any = async (req: Request, res: Response, next: NextFunction) =>  {
    const { name, email } = await req.body;

    try {
        if(!name || !email){
            return res.status(400).json({
                success: false,
                message: "name and email are required"
            })
        }

        const findUser = await prisma.$queryRaw`SELECT * FROM user WHERE email = ${email}`;

        if(findUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const user = await prisma.$queryRaw`INSERT INTO user (name, email) VALUES (${name}, ${email})`;

        return res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: (error as Error).message
        })
    }
} 


export default createUser