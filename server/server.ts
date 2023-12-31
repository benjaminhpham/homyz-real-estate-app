import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/userRoutes";
import residencyRoute from "./routes/residencyRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", authRoute);
app.use("/api/residencies", residencyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
