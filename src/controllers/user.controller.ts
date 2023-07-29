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
  const { uid } = req.params;
  const { avatar_url, email, name, password, roles } = req.body;

  const user = await userService.updateUser({
    id: uid,
    avatar_url,
    email,
    name,
    password,
    roles,
  });

  return res.send(user);
}

export async function deleteUser(req: Request, res: Response) {
  const { uid } = req.params;

  await userService.deleteUser(uid);

  return res.status(204).send();
}
