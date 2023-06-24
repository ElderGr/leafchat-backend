import express from 'express'
import UserController from '@controllers/UserController'
import uploadConfig from '@config/upload'
import multer from 'multer'

const routes = express.Router()
const upload = multer(uploadConfig);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:uid', UserController.show);
routes.put('/users/:uid/', UserController.update);
routes.delete('/users/:uid', UserController.destroy);


export default routes
