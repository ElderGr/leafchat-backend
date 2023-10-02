import commentService from '@/services/comment-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

type IFileParam = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export async function createComment(req: Request, res: Response) {
  let { content } = req.body;
  const userId = req.userId;
  let files = req.files as IFileParam[];
  if(!files) files = [];


  const filesName = files.map((file) => ({ filename: file.filename }));
  
  const { postId } = req.params;

  const comment = await commentService.add({
    post_id: postId,
    body: content,
    user_id: userId,
    files: filesName,
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
