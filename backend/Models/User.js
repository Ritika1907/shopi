const { required } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart: [
        {
          productId: { type: Number }, 
          title: { type: String },
          price: { type: Number },
          image: { type: String },
          quantity: { type: Number, default: 1 },
        },
      ],
      orders: [
        {
          productId: { type: Number }, // API Product ID
          title: { type: String },
          price: { type: Number },
          image: { type: String },
          quantity: { type: Number, default: 1 },
        },
      ],
     
});

const User = mongoose.model("user",UserSchema);
module.exports = User;