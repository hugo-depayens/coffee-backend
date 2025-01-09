import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import errorHandler from '../middlewares/errorHandler.js'

//routers
import userRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";
import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';

import swaggerSpec from '../config/swagger-output.json' assert { type: 'json' };
import { swaggerUi } from '../config/swagger.js';


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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
    res.json('Hello, world!');
})

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', cartRouter);
app.use('/api', productRouter);

export default app;


