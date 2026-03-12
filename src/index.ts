import express from "express";
import type { Express } from "express";
import cors from "cors";
import { petRouter } from "./routes/pets.routes";
import type { Request, Response } from 'express';

// import { pets, Pet } from "./data/pets";

const PORT: number = 8000;
const app: Express = express();

app.use(cors());
app.use('/pets', petRouter);

app.use((req: Request, res: Response<{message: string}>): void => {
    res.status(400).json({message: "Endpoing not found"});
})

app.listen(PORT, (): void => {
    console.log("Listening on port: ", PORT);
})