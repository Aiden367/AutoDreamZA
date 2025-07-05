import { Router, Request, Response } from "express";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
