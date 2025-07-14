import mongoose, { Document, Schema } from 'mongoose';


const PurchaseItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const PurchaseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [PurchaseItemSchema],
    totalPrice: { type: Number, required: true },
    shippingAddress: {
      fullName: { type: String },
      mobileNumber: { type: String },
      address: { type: String },
      suburb: { type: String },
      city: { type: String },
      province: { type: String },
      postalCode: { type: String },
      deliveryInstructions: { type: String },
    },
    paymentMethod: { type: String },   // 'card' or 'paypal'
    paymentId: { type: String },       // transaction id from payment gateway
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: 'Purchase' }
);

const Purchase = mongoose.model('Purchase', PurchaseSchema);

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
  phoneNumber: { type: String }, // optional
  password: { type: String, required: true },
  role: { type: String, required: true },
  cart: [CartItemSchema],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],

  // 2FA fields
  otp: { type: String },
  otpExpires: { type: Date },

  // Add these for password reset
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
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


module.exports = {User,MatProduct,RoofRackProduct,RimsProduct,RadioProduct,Purchase};