import message from "../models/message.js"
import Message from "../models/message.js"


class MessageController {
  async addNewMessage (req, res) {
    try {
      const { senderId, recipientId, messageText, _id } = req.body
      const message = await Message.create({participants:[senderId,recipientId],senderId,messageText,_id})
      res.status(200).json(message)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getMessages (req, res) {
    try{
      const { senderid, recipientid } = req.headers;
      const Messages = await Message.find().sort({updateAt: 1})
      const currentUserMessages = Messages.filter((item)=>{
        if (item.participants.includes(senderid) && item.participants.includes(recipientid)) return item
      })
      return res.json(currentUserMessages)
    } catch(e) {
      res.status(500).json(e)
    }
  }
  async addEmotionInMessage (req, res) {
    try{
      const { _id, emotion } = req.body;
      const message = await Message.findById(_id);
      message.emotion = emotion;
      const updateMessage = await Message.findByIdAndUpdate(message._id,message,{new:true})
      return res.status(200).json(updateMessage)
    } catch(e) {
      res.status(500).json(e);
    }
  }
  async editMessage (req, res) {
    try {
      const { messageId, editMessageText } = req.body
      if (!messageId){
        res.status(400).json({message: 'Id не указан'})
      }
      const message = await Message.findById(messageId);
      message.messageText = editMessageText;
      const editMessage = await Message.findByIdAndUpdate(messageId,message,{new:true})
      return res.status(200).json(editMessage)
    } catch (e){
      res.status(500).json(e)
    }
  }
  async delMessage (req, res) {
    try {
      const { id } = req.body
      const delMessage = await Message.deleteOne({_id:id})
      return res.status(200).json(delMessage)
    } catch (e){
      res.status(500).json(e);
    }
  }
}


export default new MessageController();
