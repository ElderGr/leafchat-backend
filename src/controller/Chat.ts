import { Request, Response } from "express";
import createChatService from "src/services/chats/createChatService";
import listChatService from "src/services/chats/listChatService";

export async function listChats(req: Request, res: Response){
  try{
    const chats = await listChatService()
    return res.json(chats)
  }catch(err){
    return res.status(400).json(err)
  }
}

export async function createChat(req: Request, res: Response){
  const { participants, name, message } = req.body
  try{
    const newChat = createChatService({
      participants, name, message
    })

    return res.json(newChat)
  }catch(err){
    return res.status(400).json(err)
  }
}


