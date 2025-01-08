import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import errorHandler from '../middlewares/errorHandler.js'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
}));
app.use(errorHandler);

app.get('/', (req, res) => {
    res.json('success')
})


export default app;


