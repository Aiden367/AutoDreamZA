import mongoose, { Document, Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
username: {type: String,required: true},
firstName: {type: String,required: true},
lastName: {type: String,required: true},
email:{type: String, required: true},
password: {type: String, required: true},
role: {type:String,required: true}
})

const User = mongoose.model("User",UserSchema);

// Define the Product schema
const ProductSchema = new Schema(
    {
      title: { type: String, required: true },
      price: { type: String, required: true },
      image: { type: String, required: true },
      url: { type: String, required: true }
    },
    { timestamps: true } // To automatically add createdAt and updatedAt fields
  );

const Product = mongoose.model("Product",ProductSchema);



module.exports = {User,Product};