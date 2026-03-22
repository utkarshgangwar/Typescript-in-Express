import express from "express";
import type { Router, Request, Response } from 'express';
import { Worker } from "worker_threads";

export const workerRouter: Router = express.Router();

// Request generic
workerRouter.get('/non-blocking/', (req: Request, res: Response) =>{
    return res.status(200).json("Hello Non Blocking!!")
});

// Request Generic: Params, ResBody, ReqBody, ReqQuery
workerRouter.get("/blocking/", (req: Request, res: Response) =>{

    // let counter = 0;
    // for(let i = 0; i < 20_000_000_000; i++){
    //     counter++
    // }
    // return res.status(200).json(counter);

    const worker = new Worker("./src/worker.ts");
    worker.on("message", (data)=>{
        res.status(200).send(data)
    })
    worker.on("error", (error)=>{
        res.status(200).send(`An error occured ${error}`)
    })

});