import express from "express";
import type { Express } from "express";

const PORT = 8000;
const app: Express = express();

type PetType = {
    name: string
    species: string
    adopted: boolean
    age: number
}

const pet: PetType = {
    name: "Cosmos",
    species: "Cat",
    adopted: true,
    age: 1
}

app.get("/", (req, res)=>{
    res.json(pet);
})

app.listen(PORT, (): void => {
    console.log("Listening on port: ", PORT);
})