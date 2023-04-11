import { Router } from "express";
import * as UserController from "@controllers/User";


const router = Router()

router.get(`/`, UserController.listUser)
router.post(`/`, UserController.createUser)

export default router
