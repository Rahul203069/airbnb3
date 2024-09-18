import mongoose from 'mongoose';
import { boolean, optional } from 'zod';


 export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Simple email validation
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  hashedpassword: {
    type: String,
    
    minlength: 6,
    
  },
  image:{
    typr:String,
    
  }
  ,username: {
    type: String,
    required: true,
  
  },
  verified:{
    type:Boolean,
    default:false
  },
  verifytoken:{
    type:String
    
  },
  verifytokenexpiry:{
    type:Date
    // ,optional:true
  },
  otpforforgotpassword:{
    type:Number,
    // optional:true
  }
  // You can add other fields as needed
});

const Users=mongoose.models.Users||mongoose.model('Users',userSchema);
export default Users

