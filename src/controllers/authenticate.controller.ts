import authenticate from '@/services/authentication-service';
import { Request, Response } from 'express';

export async function signInPost(req: Request, res: Response) {
  const { email, password } = req.body;

  const userSession = await authenticate.signIn({
    email,
    password,
  });

  return res.send(userSession);
}
