import express from 'express'
import ChatController from '@controllers/ChatController'
import uploadConfig from '@config/upload'
import multer from 'multer'

const routes = express.Router()
const upload = multer(uploadConfig);

routes.get('/teste', ChatController.teste);
routes.get('/chat', ChatController.index);
routes.post('/chat', upload.single('image'), ChatController.store);
routes.post('/chat/audio', multer().single('audio'), async (req, res) => {
    
    let src;
        
        if (req.file !== undefined) {
            const { filename: audio } = req.file;
            src = audio;
        }

        const { content, owner, receiver, type } = JSON.parse(req.body.content);
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

        const chatStruct = {
            participants: [owner.id, receiver.id],
            messages: [messageStruct]
        }

        // console.log(messageStruct)
        const chats = await database.ref('/Chats').once('value');

        let targetChat = '';

        chats.forEach(item => {
            if (item.val().participants.indexOf(owner.id) !== -1 && item.val().participants.indexOf(receiver.id) !== -1) targetChat = item.val();
        })

        //identifica se o chat existe ou não
        let createdChat;
        

        if (targetChat === '') {
            await database.ref('/Chats').push(chatStruct).then(message => {
                createdChat = message.path.pieces_[1];
            })

            chatStruct.id = createdChat;

            //conexoes do socket
            const ownerSocket = req.connectedUsers[owner.id];
            const receiverSocket = req.connectedUsers[receiver.id];
            if (ownerSocket) {
                req.io.to(ownerSocket).emit('new chat', chatStruct);
            }

            if (receiverSocket) {
                req.io.to(receiverSocket).emit('new chat', chatStruct);
            }
        }

        return res.json({message: 'Chat created'})
});
routes.delete('/chat/:chatid', ChatController.destroy);


export default routes
