import mongoose from "mongoose";


const Car = new mongoose.Schema({
  id:{type: String,required: true},
  _id:{type: String},
  brand:{type: String,required: true},
  model:{type: String,required: true},
  price:{type: Number,required: true},
  releaseYear:{type: Number,required: true},
  description:{type: String,required: true},
  viewed:{type: Boolean,required: true},
  liked:{type: Boolean,required: true},
})

export default mongoose.model('Car',Car)