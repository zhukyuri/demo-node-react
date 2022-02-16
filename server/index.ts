import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const PORT = process.env.PORT || 5001;

const app = express();

const start = () => {
  try {
    app.listen( PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start();
