import { Router, Request, Response } from "express";
import Stripe from "stripe";
import nodemailer from "nodemailer";
const { User, Purchase } = require('./models');
const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


router.post('/purchase', async (req, res) => {
  try {
    const { userId, items, totalPrice, shippingAddress, paymentMethod, paymentId } = req.body;

    if (!userId || !items || !totalPrice) {
       res.status(400).json({ message: 'Missing required fields' });
       return;
    }

    const newPurchase = new Purchase({
      user: userId,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      paymentId,
    });

    await newPurchase.save();

    // ✅ Push purchase into the user's `purchases` array
    await User.findByIdAndUpdate(userId, {
      $push: { purchases: newPurchase._id }
    });

    res.status(201).json({ message: 'Purchase saved', purchase: newPurchase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/purchase/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.find({ user: userId }).sort({ purchasedAt: -1 }).lean();

    const { MatProduct, RoofRackProduct, RimsProduct, RadioProduct } = require('./models');

    // Helper: Find product image based on productId in any collection
    const findProductImage = async (productId: string) => {
      const collections = [MatProduct, RoofRackProduct, RimsProduct, RadioProduct];
      for (const model of collections) {
        const product = await model.findOne({ _id: productId }).lean();
        if (product && product.image) return product.image;
      }
      return null;
    };

    // Enrich purchase items
    for (const purchase of purchases) {
      for (const item of purchase.items) {
        item.imageUrl = await findProductImage(item.productId);
      }
    }

    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Configure Nodemailer transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Test transporter configuration at startup
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Email transporter setup failed:", err);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { amount, email } = req.body;

    // ✅ Input validation
    if (!amount || !email) {
      console.warn("⚠️ Missing amount or email in request body");
     res.status(400).json({ error: "Amount and email are required" });
     return
    }

    console.log("💰 Creating payment intent for amount:", amount);
    console.log("📧 Receipt will be sent to:", email);

    // ✅ Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "zar",
    });

    const clientSecret = paymentIntent.client_secret;
    console.log("✅ Stripe PaymentIntent created:", clientSecret);

    // ✅ Send client secret back to frontend first
    res.json({ clientSecret });

    // ✅ Then attempt to send the receipt email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Purchase Receipt",
      text: `Thank you for your purchase of R${(amount / 100).toFixed(2)}. Your payment was successful!`,
      // html: '<p>Your payment was successful!</p>' // optional
    };

    console.log("📨 Sending receipt email...");

    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        console.error("❌ Error sending receipt email:", error);
      } else {
        console.log("✅ Receipt email sent:", info.response);
      }
    });

  } catch (error: any) {
    console.error("❌ Error in /create-payment-intent:", error);

    // Safely handle response error if not already sent
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error processing payment or sending email" });
    }
  }
});

module.exports = router;
