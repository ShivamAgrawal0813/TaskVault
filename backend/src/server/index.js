import dotenv from 'dotenv'
import express from 'express'
import connectDB from '../config/db.js';
import authRoutes from "../routes/auth.routes.js";
import taskRoutes from "../routes/task.routes.js";
import userRoutes from "../routes/user.routes.js";
import errorHandler from '../middleware/error.middleware.js';
import cors from "cors";

dotenv.config();
// console.log("MONGO_URI:", process.env.MONGO_URI);
// // console.log(process.env);
await connectDB();

// const hostname = '127.0.0.1';
const port = process.env.PORT;

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks",taskRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})