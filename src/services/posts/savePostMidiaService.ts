import { Post } from "src/entities/sql/Post";
import { PostMidia } from "src/entities/sql/PostMidia";
import { getRepository } from "typeorm";

interface IParams{
  midia: string;
  id_post: string;
}

export default async function savePostMidiaService({
  midia,
  id_post
}: IParams): Promise<PostMidia>{
  const postRepository = getRepository(Post)
  const postMidiaRepository = getRepository(PostMidia)

  const postExists = await postRepository.findOne({
    where: {
      id: id_post
    }
  })

  if(!postExists){
    throw new Error(`Post not exists`)
  }

  const createdMidia = postMidiaRepository.create({
    file: midia,
    id_post
  })

  await postMidiaRepository.save(createdMidia)

  return createdMidia
}
