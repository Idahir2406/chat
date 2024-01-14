import {Schema,model,models} from 'mongoose';
import Chat from './Chat';
import { ChatSchema } from './Chat';


const UserSchema=new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image:{
    type: String,
  },
  chats:{
    default: [],
    type: [ChatSchema],
  },
},{timestamps:true})

export default models.User || model('User', UserSchema)