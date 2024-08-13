import express from "express";
import { connect } from "./connectDb.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = 3000;

connect(); //function to connect to mongo db

app.use("/api/user/", userRoute);
app.use("/api/auth/", authRoute);

app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
