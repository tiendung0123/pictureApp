import express from 'express';
import { getUser, getSavedPhotos, getCreatedPhotos, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, getUser);
userRouter.get('/photos/saved', authMiddleware, getSavedPhotos);
userRouter.get('/photos/created', authMiddleware, getCreatedPhotos);
userRouter.put('/', authMiddleware, updateUser);

export default userRouter;
