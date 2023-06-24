import express from 'express'
import PostController from '@controllers/PostController'
import LikeController from '@controllers/LikeController'
import CommentsController from '@controllers/CommentsController'
import uploadConfig from '@config/upload'
import multer from 'multer'

const routes = express.Router()
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.delete('/posts/:id', PostController.destroy);
//Likes
routes.post('/posts/:postId/like', LikeController.store);
//Coments
routes.post('/posts/:postId/comment', CommentsController.store);


export default routes
