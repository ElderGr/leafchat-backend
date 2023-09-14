import postService, { ICreatePostParams, IListPostParams } from '@/services/post-service';
import { Request, Response } from 'express';

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

export async function getPosts(req: Request, res: Response) {
  const { create_at, id, title, user_id } = req.query as IListPostParams;

  return res.send(
    await postService.listPost({
      create_at,
      id,
      title,
      user_id,
    }),
  );
}

export async function createPost(req: Request, res: Response) {
  const { description, title } = req.body as ICreatePostParams;
  const files = req.files as IFileParam[];

  const filesName = files.map((file) => ({ filename: file.filename }));

  const createdPost = await postService.createPost({
    description,
    title,
    user_id: req.userId,
    files: filesName,
  });

  return res.send(createdPost);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  await postService.removePost(id);

  return res.status(200).end();
}
