import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '@/controllers/user.controller';
import { validateBody } from '@/schemas/validation-middleware';
import { userSchema } from '@/schemas/user-schemas';
import { authenticateToken } from '@/middlewares/authentication.middleware';

const routes = express.Router();

routes
  .get('/users', authenticateToken, getUsers)
  .post('/users', authenticateToken, validateBody(userSchema), createUser)
  .put('/users/:uid/', authenticateToken, validateBody(userSchema), updateUser)
  .delete('/users/:uid', authenticateToken, deleteUser);

export default routes;
