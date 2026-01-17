import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const getMe = async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId).select("-hashed_pass");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const updateMe = async (req, res) => {
  const userId = req.user.userId;
  const { name, email } = req.body;

  if (!name || !email) {
    throw new AppError("Name and email are required", 400);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true }
  ).select("-hashed_pass");

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
};
