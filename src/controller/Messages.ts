import { Request, Response } from "express";
import createMessageService from "src/services/messages/createMessageService";
import listMessageService from "src/services/messages/listMessageService";

export async function listMessages(req: Request, res: Response){
  try{
    const { idChat } = req.params

    const messages = await listMessageService({
      idChat
    })
    return res.json(messages)
  }catch(err){
    return res.status(400).json(err)
  }
}

export async function createMessage(req: Request, res: Response){
  const { message, from, to, id_chat } = req.body
  try{
    const newMessage = await createMessageService({
      message,
      from,
      to,
      id_chat
    })

    return res.json(newMessage)
  }catch(err){
    return res.status(400).json(err)
  }
}


