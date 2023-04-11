import { Post } from "src/entities/sql/Post";
import { getRepository } from "typeorm";

export default async function listPostService(): Promise<Post[]>{
  const postRepository = getRepository(Post)

  const posts = await postRepository
    .createQueryBuilder("PostMidia")
    .select([
      "file",
    ])
    .leftJoinAndSelect("postMidia","postMidia.post")
    .execute()

  return posts
}
