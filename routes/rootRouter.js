import express from 'express';
import userRouter from './userRouter.js';  
import photoRouter from './photoRouter.js';
import authRouter from './authRouter.js';

const rootRouter = express.Router()

rootRouter.use('/user', userRouter);
rootRouter.use('/photos', photoRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
