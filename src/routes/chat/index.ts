import { Router } from "express";
import * as ChatController from "@controllers/Chat";

const router = Router()

router.get(`/`, ChatController.listChats)
router.post(`/`, ChatController.createChat)

export default router
