import { Router } from "express";

import UserRoutes from "./user";
import RolesRoutes from "./roles";
import PostsRoutes from "./posts";
import MessagesRoutes from "./messages";
import ChatRoutes from "./chat";

const router = Router()

router.use(`/users`, UserRoutes)
router.use(`/roles`, RolesRoutes)
router.use(`/posts`, PostsRoutes)
router.use(`/messages`, MessagesRoutes)
router.use(`/chat`, ChatRoutes)


export default router
