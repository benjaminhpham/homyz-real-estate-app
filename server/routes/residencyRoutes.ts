import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyController";

const router = express.Router();

router.get("/", getAllResidencies);
router.get("/:id", getResidency);
router.post("/create", createResidency);

export default router;
