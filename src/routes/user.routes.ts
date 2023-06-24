import express from 'express'
import {
  createUser, 
  deleteUser, 
  findUser, 
  getUsers, 
  updateUser
} from '@controllers/user.controller'

const routes = express.Router()

routes.get('/users', getUsers);
routes.post('/users', createUser);
routes.get('/users/:uid', findUser);
routes.put('/users/:uid/', updateUser);
routes.delete('/users/:uid', deleteUser);


export default routes
