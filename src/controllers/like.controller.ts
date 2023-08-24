import { Request, Response } from 'express';
import httpStatus from 'http-status';
import likeService from '@/services/likes-service';

export async function addLikes(req: Request, res: Response) {
  const { postId } = req.params;
  const userId = req.userId;

  await likeService.addOrRemove(postId, userId);

  return res.status(httpStatus.OK).end();
}
