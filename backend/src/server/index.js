import dotenv from 'dotenv'
import { createServer } from 'node:http';
import connectDB from '../config/db.js';

dotenv.config();
// console.log("MONGO_URI:", process.env.MONGO_URI);
// // console.log(process.env);
await connectDB();

const hostname = '127.0.0.1';
const port = process.env.PORT;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
