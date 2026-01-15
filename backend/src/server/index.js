import dotenv from 'dotenv'
import express from 'express'
import connectDB from '../config/db.js';
import authRoutes from "../routes/auth.routes.js";
import taskRoutes from "../routes/task.routes.js";
import errorHandler from '../middleware/error.middleware.js';

dotenv.config();
// console.log("MONGO_URI:", process.env.MONGO_URI);
// // console.log(process.env);
await connectDB();

// const hostname = '127.0.0.1';
const port = process.env.PORT;

const app = express()

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks",taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})