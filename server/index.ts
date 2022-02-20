import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// @ts-ignore
import mongoose from "mongoose";
import router from './src/router'
import errorsMiddleware from './src/middlewares/error-middleware';


const PORT = process.env.PORT || 5001;
const DB_URL = process.env.DB_URL || '';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorsMiddleware)


const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen( PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
    console.log('>>>>>> Error',e)
  }
}

start();
