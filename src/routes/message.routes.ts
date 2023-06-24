import express from 'express'
import MessageController from '@controllers/MessageController'
import uploadConfig from '@config/upload'
import multer from 'multer'

const routes = express.Router()
const upload = multer(uploadConfig);

routes.post(`/message/:chatid`, upload.single('image'), MessageController.store);
routes.post(`/message/:chatid/audio`, multer().single('audio'), async (req, res) =>{
    let src; 
        if (req.file !== undefined) {
            const { filename: audio } = req.file;
            src = audio;
        }

        const {chatid} = req.params;
        const {content, owner, receiver, type} = JSON.parse(req.body.content);
        const fileName = `${owner.id}___${new Date().getTime()}.wav`;

        let uploadLocation = `./uploads/blob/${fileName}` 
        fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); 

        const messageStruct = {
            image: req.file !== undefined ? `http://localhost:5000/files/${src}` : '', 
            owner,
            receiver,
            content: `http://localhost:5000/files/blob/${fileName}`,
            type,
            timestamp: new Date().getTime()
        }

        //conexoes do socket
        const ownerSocket = req.connectedUsers[owner.id];
        const receiverSocket = req.connectedUsers[receiver.id];

        if(ownerSocket){
            req.io.to(ownerSocket).emit('chat message', messageStruct);
        }

        if(receiverSocket){
            req.io.to(receiverSocket).emit('chat message', messageStruct);
        }

        await database.ref(`Chats/${chatid}/messages`).push(messageStruct);

        return res.json({message: 'success'})
});


export default routes
