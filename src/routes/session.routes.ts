import express from 'express'
import { createSession, getSession } from '@controllers/session.controller'

const routes = express.Router()

routes.get('/sessions', getSession);
routes.post('/sessions', createSession);

export default routes
