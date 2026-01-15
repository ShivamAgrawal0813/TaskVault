import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            // return res.status(400).json({
            //     success: false,
            //     message: "All fields are required",
            // });
            throw new AppError("All fields are required",400);
        }

        if (password.length < 8) {
            // return res.status(400).json({
            //     success: false,
            //     message: "Password must be at least 8 characters long",
            // });
            throw new AppError("Password must be at least 8 characters long",400);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            name,
            email,
            hashed_pass: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            // return res.status(409).json({
            //     success: false,
            //     message: "Email already exists",
            // });
            return next(new AppError("Email already exists", 409));
        }

        if (error.name === "ValidationError") {
            // return res.status(400).json({
            //     success: false,
            //     message: error.message,
            // });
            return next(new AppError(error.message, 400));
        }

        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // return res.status(400).json({
            //     success: false,
            //     message: "Email and password are required",
            // });
            throw new AppError("Email and password are required", 400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            // return res.status(401).json({
            //     success: false,
            //     message: "Invalid credentials.",
            // });
            throw new AppError("Invalid credentials", 401);
        }

        const isMatch = await bcrypt.compare(password, user.hashed_pass);

        if (!isMatch) {
            // return res.status(401).json({
            //     success: false,
            //     message: "Invalid credentials.",
            // });
            throw new AppError("Invalid credentials", 401);
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        next(error);
    }
};