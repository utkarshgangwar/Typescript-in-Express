import express from "express";
import type { Express } from "express";
import cors from "cors";
import type { Request, Response } from 'express';
import { Worker } from "worker_threads";

const PORT: number = 8001;
const app: Express = express();
const THREAD_COUNT: number = 4;

function createWorker(): Promise<number> {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./src/eight-worker.ts", {
            workerData: {thread_count: THREAD_COUNT}
        });

        worker.on("message", (data)=>{
            resolve(data);
        })

        worker.on("error", (error)=>{
            reject(error);
        })

    })
}

// handle cross origin request
app.use(cors());
app.get("/worker/blocking/", async (req, res) => {
    const workerPromises = [];

    for(let i = 0; i < THREAD_COUNT; i++){
        workerPromises.push(createWorker())
    }

    const thread_result = await Promise.all(workerPromises);
    const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3];
    res.status(200).send(`Total from ${THREAD_COUNT} is ${total}`);
});

app.get("/worker/non-blocking", (req, res) =>{
    return res.status(200).json("Hello worker non-blocking!");  
});

// not defined routes 404 handle
app.use((req: Request, res: Response<{message: string}>): void => {
    res.status(400).json({message: "Endpoing not found"});
})

// start server
app.listen(PORT, (): void => {
    console.log("Listening on port: ", PORT);
})