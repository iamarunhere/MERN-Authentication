import express from "express";
import { connect } from "./connectDb.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://mern-authentication-3qy1.onrender.com/",
    credentials: true,
  })
);
const PORT = 3000;

connect(); //function to connect to mongo db

app.use("/api/user/", userRoute);
app.use("/api/auth/", authRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
