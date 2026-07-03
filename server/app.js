import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  " http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);




app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Book Store API'
  })
});


export default app;
