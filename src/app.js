import express from 'express'
import authRoute from './routes/auth.routes';
import cookie from 'cookie-parser'

const app = express();

app.use(express.json())
app.use("/api/auth", authRoute);

export default app