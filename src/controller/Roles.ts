import { Request, Response } from "express";
import createRoleService from "../services/roles/createRoleService";
import listRoleService from "../services/roles/listRoleService";

export async function listRoles(req: Request, res: Response){
  try{
    const roles = await listRoleService()

    return res.json(roles)
  }catch(err){
    return res.status(400).json(err)
  }
}

export async function createRoles(req: Request, res: Response){
  try{
    const { name } = req.body

    const createdRole = await createRoleService({ name })

    return res.json(createdRole)
  }catch(err){
    console.log(err)
    return res.status(400).json(err)
  }
}


