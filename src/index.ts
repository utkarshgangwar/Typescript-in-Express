import express from "express";
import type { Express } from "express";
import cors from "cors";
import { petRouter } from "./routes/pets.routes";
import { workerRouter } from "./routes/worker.routes";
import type { Request, Response } from 'express';

const PORT: number = 8000;
const app: Express = express();

// handle cross origin request
app.use(cors());
app.use('/pets', petRouter);
app.use('/workers', workerRouter);

// not defined routes 404 handle
app.use((req: Request, res: Response<{message: string}>): void => {
    res.status(400).json({message: "Endpoing not found"});
})

// start server
app.listen(PORT, (): void => {
    console.log("Listening on port: ", PORT);
})