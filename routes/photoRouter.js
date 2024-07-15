import express from 'express';
import { getPhotos, searchPhotos, getPhotoDetails, getComments, checkSaved, addComment, deletePhoto, addPhoto } from '../controllers/photoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const photoRouter = express.Router();

photoRouter.get('/', getPhotos);
photoRouter.get('/search', searchPhotos);
photoRouter.get('/:id', getPhotoDetails);
photoRouter.get('/:id/comments', getComments);
photoRouter.get('/:id/saved', checkSaved);
photoRouter.post('/:id/comments', authMiddleware, addComment);
photoRouter.delete('/:id', authMiddleware, deletePhoto);
photoRouter.post('/', authMiddleware, addPhoto);

export default photoRouter;
