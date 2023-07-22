import { Request, Response } from 'express';
import * as userService from '@/services/user-service/index';
import { IFindUserParams } from '@/repositories/user-repository';

export async function getUsers(req: Request, res: Response) {
  const requestParams: IFindUserParams = req.query;

  return res.send(await userService.getUser(requestParams));
}

export async function createUser(req: Request, res: Response) {
  const { avatar_url, email, name, password, roles } = req.body;

  const user = await userService.createUser({
    avatar_url,
    email,
    name,
    password,
    roles,
  });

  return res.send(user);
}

export async function updateUser(req: Request, res: Response) {
  //     const { uid } = req.params;
  //     let data = req.body;
  //     try{
  //         if(isEmpty(data)) throw "Error: empty values are detecteds";
  //         await database.ref(`/User/${uid}`).update(data, function(err) {
  //             if (err) {
  //                 res.send(err);
  //             } else {
  //                 res.json({ "message": "successfully update data", "result": true })
  //             }
  //         })
  //     }catch(err){
  //         return res.status(400).json({err});
  //     }
}

export async function deleteUser(req: Request, res: Response) {
  //     const { uid } = req.params;
  //     try{
  //         await database.ref(`/User/${uid}`).remove(function(err) {
  //           if (err) {
  //               res.send(err);
  //           } else {
  //               res.json({ message: "success: User deleted.", "result": true })
  //           }
  //       })
  //     }catch(err){
  //         return res.json({err})
  //     }
}
