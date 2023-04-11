import { Post } from "src/entities/sql/Post";
import { User } from "src/entities/sql/User";
import { getRepository } from "typeorm";
import savePostMidiaService from "./savePostMidiaService";

interface IParams{
  message: string;
  id_user: string;
  midia: string;
}

export default async function createPostService({
  id_user,
  message,
  midia
}: IParams): Promise<Post>{
  const postRepository = getRepository(Post)
  const userRepository = getRepository(User)

  const userExists = await userRepository.findOne({
    where: {
      id: id_user
    }
  })

  if(!userExists){
    throw new Error(`User not exists`)
  }

  const createdPost = postRepository.create({
    message,
    id_user,
  })

  await postRepository.save(createdPost)

  await savePostMidiaService({ id_post: createdPost.id, midia })

  return createdPost
}
