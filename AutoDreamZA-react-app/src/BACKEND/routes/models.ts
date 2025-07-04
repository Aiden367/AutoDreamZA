import mongoose, { Document, Schema } from 'mongoose';


const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  },
  { _id: false }
);


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  cart: [CartItemSchema] // 🛒 add this line
});

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

const RadioProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    available: { type: Boolean, default: true },
    manufacturer: { type: String, default: "Booxe" },
    type: { type: String }
  },
  { timestamps: true ,collection: "RadioProduct"}
);


const RadioProduct = mongoose.model("RadioProduct",RadioProductSchema);


module.exports = {User,MatProduct,RoofRackProduct,RimsProduct,RadioProduct};