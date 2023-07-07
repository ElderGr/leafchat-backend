import { Request, Response } from 'express';
import * as userService from '@services/index';

export async function getUsers(req: Request, res: Response) {
  return res.json({
    mes: 'hello world',
  });
}

export async function findUser(req: Request, res: Response) {
  //     const { uid } = req.params;
  //     try{
  //         await database.ref(`/User/${uid}`).once('value', function(snapshot) {
  //             if (snapshot.val() == null) {
  //                 res.json({ message: "Error: No user found", "result": false});
  //             } else {
  //                 const {password, ...obj} = snapshot.val();
  //                 res.json({
  //                     ...obj,
  //                     id: snapshot.ref_.path.pieces_[1]
  //                 });
  //             }
  //         });
  //     }catch(err){
  //         return res.json({err});
  //     }
}

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userService.createUser();
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
