import bcrypt from "bcrypt";
import User from "./../models/userModel.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    newUser.save();
    res.status(201).json({ message: "User Created Succesfully" });
  } catch (error) {
    res.satus(500).json({ message: error.message });
  }
};
