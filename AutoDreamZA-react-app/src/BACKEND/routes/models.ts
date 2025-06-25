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

const MatProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    available: { type: Boolean, default: true },
    manufacturer: { type: String, default: "Booxe" },
    type: { type: String }
  },
  { timestamps: true, collection: "MatProduct" }
);


const MatProduct = mongoose.model("MatProduct",MatProductSchema);


const RoofRackProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    available: { type: Boolean, default: true },
    manufacturer: { type: String, default: "Booxe" },
    type: { type: String }
  },
  { timestamps: true ,collection: "RoofRackProduct"}
);


const RoofRackProduct = mongoose.model("RoofRackProduct",RoofRackProductSchema);

const RimsProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    available: { type: Boolean, default: true },
    manufacturer: { type: String, default: "Booxe" },
    type: { type: String }
  },
  { timestamps: true ,collection: "RimsProduct"}
);


const RimsProduct = mongoose.model("RimsProduct",RimsProductSchema);


module.exports = {User,MatProduct,RoofRackProduct,RimsProduct};