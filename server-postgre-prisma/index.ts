import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import os from 'os';
import router from './src/router'
import errorsMiddleware from './src/middlewares/error-middleware';

console.log('\nCounts of processors:', os.cpus().length);
console.log('\nCORS to:', process.env.CLIENT_URL);

const PORT = process.env.PORT || 5001;

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
    app.listen(PORT, () => console.log(`\nServer started on PORT = ${PORT}\n`))
  } catch (e) {
    console.log('Start server error', e)
  }
}

start();
