import { Request, Response } from "express";
import createPostService from "../services/posts/createPostService";
import listPostService from "../services/posts/listPostService";

export async function listPosts(req: Request, res: Response){
  try{
    const post = await listPostService()

    return res.json(post)
  }catch(err){
    return res.status(400).json(err)
  }
}

export async function createPost(req: Request, res: Response){
  try{
    const { message, id_user } = req.body;
    const midia = req.file.filename

    const createdPost = createPostService({ message, id_user, midia})

    return res.json(createdPost)
  }catch(err){
    console.log(err)
    return res.status(400).json(err)
  }
}


