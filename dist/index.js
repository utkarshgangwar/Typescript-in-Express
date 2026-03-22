import express from "express";
import cors from "cors";
import { petRouter } from "./routes/pets.routes.js";
import { workerRouter } from "./routes/worker.routes.js";
const PORT = 8000;
const app = express();
// handle cross origin request
app.use(cors());
app.use('/pets', petRouter);
app.use('/workers', workerRouter);
// not defined routes 404 handle
app.use((req, res) => {
    res.status(400).json({ message: "Endpoing not found" });
});
// start server
app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
});
