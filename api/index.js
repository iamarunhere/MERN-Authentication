import express from "express";
import { connect } from "./connectDb.js";
import userRoute from "./routes/userRoute.js";
const app = express();
const PORT = 3000;

connect(); //function to connect to mongo db

app.use("/api/user/", userRoute);
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
