import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { createServer } from 'node:http';

dotenv.config();
// console.log("MONGO_URI:", process.env.MONGO_URI);
// // console.log(process.env);
try{
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
}catch(err){
  console.error("Error Connecting to MongoDB at server start: ",err.message);
  process.exit(1);
}

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
