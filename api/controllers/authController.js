import bcrypt from "bcrypt";
import User from "./../models/userModel.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Succesfully" });
    console.log("User Created Succesfully");
  } catch (error) {
    next(error);
  }
};
