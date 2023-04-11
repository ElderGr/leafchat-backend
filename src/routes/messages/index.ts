import { Router } from "express";
import * as MessagesController from "@controllers/Messages";

const router = Router()

router.get(`/:idChat`, MessagesController.listMessages)
router.post(`/`, MessagesController.createMessage)

export default router
