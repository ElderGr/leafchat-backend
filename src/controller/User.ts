import { Request, Response } from "express";
import createUserService from "src/services/users/createUsersService";
import listUserService from "src/services/users/listUserService";

export async function listUser(req: Request, res: Response){
  try{
    const users = await listUserService()

    return res.json(users)
  }catch(err){
    return res.status(400).json(err)
  }
}

export async function createUser(req: Request, res: Response){
  try{
    const { name, id_role, email, password } = req.body

    const createdUser = await createUserService({ name, id_role, email, password })
    delete createdUser.password

    return res.json(createdUser)
  }catch(err){
    return res.status(400).json(err)
  }
}


