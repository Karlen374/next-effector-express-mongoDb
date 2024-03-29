import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';

const User = new mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, validate: [ isEmail, 'invalid email' ], unique: true, required: true},
  password: {type: String, required: true},
  roles: [{type: String, ref: 'Role'}],
  avatar: {type: String},
})

export default mongoose.model('User',User)