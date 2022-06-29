import mongoose from "mongoose";

const Message = new mongoose.Schema({
  participants:{type: Array,required:true},
  senderId:{type:String,required:true},
  messageText:{type:String, required:true},
  },
  { 
    timestamps: true
  },
)

export default mongoose.model('Message',Message)