import Message from "../models/message.js"


class MessageController {
  async addNewMessage (req, res) {
    try {
      console.log(req.body)
      const { senderId, recipientId, messageText } = req.body
      const message = await Message.create({participants:[senderId,recipientId],senderId,messageText})
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
}


export default new MessageController();
