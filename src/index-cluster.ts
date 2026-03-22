import express from "express";
import type { Express } from "express";
import cors from "cors";
import type { Request, Response } from 'express';

const PORT: number = 8002;
const app: Express = express();

// handle cross origin request
app.use(cors());

app.get("/cluster/heavy", (req: Request, res: Response) => {
    let total = 0;
    for(let i = 0; i < 50_000_000; i++){
        total ++;
    }
    res.send(`The total of the CPU intensive task is ${total}\n`);
})

// start server
app.listen(PORT, (): void => {
    console.log("Listening on port: ", PORT);
})