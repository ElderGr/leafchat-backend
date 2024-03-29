import { CreatePostDto } from '@/domain/post/post.dto';
import postService, { IListPostParams } from '@/services/post-service';
import { IFileParam } from '@/shared/types';
import { Request, Response } from 'express';

export async function getPosts(req: Request, res: Response) {
  const { create_at, id, title, user_id, take } = req.query as IListPostParams;

  return res.send(
    await postService.listPost({
      create_at,
      id,
      title,
      user_id,
      take: take ? Number(take) : undefined,
    }),
  );
}

export async function createPost(req: Request, res: Response) {
  const { description, title } = req.body as CreatePostDto;
  const files = req.files as IFileParam[];

  const filesName = files.map((file) => ({
    name: file.filename,
    link: `${process.env.BACKEND_URL}/files/${file.filename}`,
  }));

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
