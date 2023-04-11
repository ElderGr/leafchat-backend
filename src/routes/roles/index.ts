import { Router } from "express";
import * as RolesController from "@controllers/Roles";

const router = Router()

router.get(`/`, RolesController.listRoles)
router.post(`/`, RolesController.createRoles)

export default router
