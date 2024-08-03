import bcrypt from "bcrypt";
import User from "./../models/userModel.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedpassword = await bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Succesfully" });
  } catch (error) {
    next(error);
  }
};
