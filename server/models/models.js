import mongoose from "mongoose";

const Model = new mongoose.Schema({
  model:{type: Object,required: true},
})

export default mongoose.model('Model',Model)