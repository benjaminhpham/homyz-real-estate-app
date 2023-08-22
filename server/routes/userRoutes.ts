import express from "express";
import {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  addFavResidency,
  getAllFavorites,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/cancelBooking/:id", cancelBooking);
router.post("/toFavorite/:id", addFavResidency);
router.post("/allFavorites", getAllFavorites);

export default router;
