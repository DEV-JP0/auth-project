// emailService.js
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import {sender} from './mailtrap.config.js';

import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  // if you want a welcome‐email template locally:
  WELCOME_EMAIL_TEMPLATE
} from './emailTemplates.js'

// pull these from your .env
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,       // 'true' or 'false'
  SMTP_USER,
  SMTP_PASS,
  SENDER_EMAIL
} = process.env

// create the transporter once
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === 'true',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
})

export const sendVerificationEmail = async (email, verificationToken) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace(
    '{verificationCode}',
    verificationToken
  )

  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Verify your email',
      html
    })
    console.log('Verification email sent:', info.messageId)
  } catch (err) {
    console.error('Error sending verification email', err)
    throw new Error(`Error sending verification email: ${err.message}`)
  }
}

export const sendWelcomeEmail = async (email, name) => {
  // if you used a hosted template in Mailtrap before,
  // you can swap it for your own HTML here
  const html = WELCOME_EMAIL_TEMPLATE
    .replace('{company_info_name}', 'Auth Company')
    .replace('{name}', name)

  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Welcome to Auth Company!',
      html
    })
    console.log('Welcome email sent:', info.messageId)
  } catch (err) {
    console.error('Error sending welcome email', err)
    throw new Error(`Error sending welcome email: ${err.message}`)
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL)

  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Reset your password',
      html
    })
    console.log('Password reset email sent:', info.messageId)
  } catch (err) {
    console.error('Error sending password reset email', err)
    throw new Error(`Error sending password reset email: ${err.message}`)
  }
}

export const sendResetSuccessEmail = async (email) => {
  const html = PASSWORD_RESET_SUCCESS_TEMPLATE

  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Password Reset Successful',
      html
    })
    console.log('Password reset success email sent:', info.messageId)
  } catch (err) {
    console.error('Error sending reset success email', err)
    throw new Error(`Error sending reset success email: ${err.message}`)
  }
}