import express from "express";
import { connect } from "./connectDb.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
app.use(express.json());
const PORT = 3000;

connect(); //function to connect to mongo db

app.use("/api/user/", userRoute);
app.use("/api/auth/", authRoute);

app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
