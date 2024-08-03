import express from "express";
import { connect } from "./connectDb.js";
const app = express();
const PORT = 3000;

connect(); //function to connect to mongo db
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
