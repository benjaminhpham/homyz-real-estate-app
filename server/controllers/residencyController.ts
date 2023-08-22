import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createResidencyDB,
  getResidenciesDB,
  getResidencyDB,
} from "../db/residencyDB";

export const getAllResidencies = asyncHandler(
  async (req: Request, res: Response) => {
    const residencies = await getResidenciesDB();
    res.send(residencies);
  }
);

export const getResidency = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const residency = await getResidencyDB(id);
      res.send(residency);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const createResidency = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      price,
      address,
      city,
      country,
      image,
      facilities,
      userEmail,
    } = req.body.data;

    try {
      const residency = await createResidencyDB({
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      });

      res.send({ message: "Residency created successfully", residency });
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new Error("A residency with address already here");
      }
      throw new Error(err.message);
    }
  }
);
