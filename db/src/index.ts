import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";    
import createUser  from "./controllers/create";
import { createMany, getProgress } from "./controllers/many";
import getUsers from "./controllers/getusers";
import getUser from "./controllers/getUser";
import findByEmail from "./controllers/findbyemail";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 9000;
const servicesName = process.env.SERVICES_NAME || "product-management";


// Health check
app.get("/health", (_req, res) => {
   res.status(200).json({ status: "UP" });
});

// User routes
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getUsers(req, res, next);
    } catch (err) {
        next(err);
    }
});
app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getUser(req, res, next); 
    } catch (err) {
        next(err);
    }
});
app.get('/users-by-email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await findByEmail(req, res, next);
    } catch (err) {
        next(err);
    }
});
app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createUser(req, res, next);
    } catch (err) {
        next(err);
    }
});
app.post('/users/many', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createMany(req, res, next);
    } catch (err) {
        next(err);
    }
});
app.get('/users/many/progress', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getProgress(req, res);
    } catch (err) {
        next(err);
    }
});

// 404 and error handlers must be last
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});

app.use((err: Error, _req, res, _next) => {
    res.status(500).json({ error: err.message, message: "Internal Server Error" });
});


app.listen(port, () => {
    console.log(`${servicesName} Server started on port ${port}`);
});