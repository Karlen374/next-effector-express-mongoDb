import mongoose from "mongoose";

const Brand = new mongoose.Schema({
  brand:{type: Object,required: true},
})

export default mongoose.model('Brand',Brand)