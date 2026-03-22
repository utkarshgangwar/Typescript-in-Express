import express from "express";
import type { Router } from 'express';
import { getPetById, getPets } from "../controllers/pets.controllers.js";
import { validateNumericId, pleaseAuth } from "../middleware/pets.middleware.js";

export const petRouter: Router = express.Router();

// Request generic
petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById)

// Request Generic: Params, ResBody, ReqBody, ReqQuery
petRouter.get("/", getPets)