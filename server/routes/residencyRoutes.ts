import express from "express";
import { createResidency } from "../controllers/residencyController";

const router = express.Router();

router.post("/create", createResidency);

export default router;
