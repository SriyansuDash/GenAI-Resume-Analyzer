import express from 'express'
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/auth", authRoute);

export default app