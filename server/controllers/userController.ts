import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createUserDB, getUserDB } from "../db/userDB";

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
