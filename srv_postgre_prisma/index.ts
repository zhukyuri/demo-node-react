import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// @ts-ignore
import os from 'os';
// @ts-ignore
import mongoose from "mongoose";
import router from './src/router'
import errorsMiddleware from './src/middlewares/error-middleware';

console.log('\nCounts of processors:', os.cpus().length);

const PORT = process.env.PORT || 5001;
const DB_URL = process.env.DB_URL || '';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorsMiddleware)


const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`\nServer started on PORT = ${PORT}\n`))
  } catch (e) {
    console.log('>>>>>> Error', e)
  }
}

start();
