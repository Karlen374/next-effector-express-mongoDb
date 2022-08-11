import mongoose from "mongoose";

const Message = new mongoose.Schema({
  participants:{type: Array,required:true},
  senderId:{type:String,required:true},
  messageText:{type:String, required:true},
  emotion:{type:String},
  _id:{type:String},
  },
  { 
    timestamps: true
  },
)

export default mongoose.model('Message',Message)