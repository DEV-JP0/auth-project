// emailConfig.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// create reusable transporter object using SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// define a consistent sender identity
export const sender = {
  name: process.env.SENDER_NAME ,
  email: process.env.SENDER_EMAIL ,
};