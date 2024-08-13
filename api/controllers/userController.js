import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json("You can update only your account");
  }

  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return res.status(401).json("You can delete your account only");
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};
