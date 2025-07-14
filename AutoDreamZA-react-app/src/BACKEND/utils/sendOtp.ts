// BACKEND/utils/sendOtp.ts
import nodemailer from 'nodemailer';

export const sendOtp = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"AutoDream Security" <no-reply@autodream.com>',
    to: email,
    subject: 'Your Verification Code',
    text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
