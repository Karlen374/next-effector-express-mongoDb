import {Router} from 'express';
import MessageController from '../controllers/MessageController.js';

const messageRouter = new Router();

messageRouter.post('/sendMessage',MessageController.addNewMessage);
messageRouter.get('/getMessages', MessageController.getMessages);
messageRouter.post('/addEmotion', MessageController.addEmotionInMessage);
messageRouter.post('/editMessage', MessageController.editMessage);
messageRouter.delete('/delMessage',MessageController.delMessage);

export default messageRouter;