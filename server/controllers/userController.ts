import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  checkUserBooking,
  createUserDB,
  deleteBookingDB,
  getAllBookingsDB,
  getUserDB,
  updateUserDB,
  getFavoriteResidenciesDB,
} from "../db/userDB";
import { prisma } from "../config/figmaConfig";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const userExists = await getUserDB(email);
  if (!userExists) {
    const user = await createUserDB(req.body);
    res.send({
      message: "User registered successfully",
      user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

export const bookVisit = asyncHandler(async (req: Request, res: Response) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await checkUserBooking(email);
    if (alreadyBooked?.bookedVisits.some((visit: any) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await updateUserDB(email, {
        bookedVisits: { push: { id, date } },
      });
      res.send("Your visit is booked successfully");
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
});

export const getAllBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const bookings = await getAllBookingsDB(email);
      res.status(200).send(bookings);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const cancelBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const { id } = req.params;

    const bookings = await getAllBookingsDB(email);
    const index = bookings?.bookedVisits.findIndex(
      (visit: any) => visit.id === id
    ) as number;

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      bookings?.bookedVisits.splice(index, 1);
      await deleteBookingDB(email, bookings);
      res.send("Booking cancelled successfully");
    }

    try {
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const addFavResidency = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
      const user = await getUserDB(email);
      if (user?.favResidenciesID.includes(id)) {
        const updatedUser = await updateUserDB(email, {
          favResidenciesID: {
            set: user.favResidenciesID.filter((favId) => favId !== id),
          },
        });
        res.send({ message: "Removed from favorites", user: updatedUser });
      } else {
        const updatedUser = await updateUserDB(email, {
          favResidenciesID: {
            push: id,
          },
        });
        res.send({ message: "Updated from favorites", user: updatedUser });
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const getAllFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const favResidenciesID = await getFavoriteResidenciesDB(email);
      res.status(200).send(favResidenciesID);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);
