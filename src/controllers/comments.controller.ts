import commentService from '@/services/comment-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function createComment(req: Request, res: Response) {
  const { content } = req.body;

  const { postId } = req.params;

  const comment = await commentService.add({
    post_id: postId,
    body: content,
    user_id: req.userId,
  });

  return res.status(httpStatus.CREATED).send(comment);
}

export async function getComments(req: Request, res: Response) {
  const { postId } = req.params;

  const comments = await commentService.list({
    post_id: postId,
  });

  return res.send(comments);
}
