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
}


export default new MessageController();
