import { NODEMAILER_PASS, NODEMAILER_USER } from "./config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

const sendEmail = async ({
  receiver,
  subject,
  text,
  title,
  href,
  buttonText,
}) => {
  await transporter.sendMail({
    from: `"Task Flow App" <${NODEMAILER_USER}>`,
    to: receiver,
    subject,
    text,
    html: `<div> 
              <h2> ${title} </h2>
              <a href="${href}">
                <button>${buttonText}</button>
              </a>  
            </div>`,
  });
};

export const sendVerificationEmail = async (receiver, href) => {
  await sendEmail({
    receiver,
    href,
    subject: "Registration Confirm Email",
    text: "Email verification from Task Flow App",
    title: "Click on the link below to verify email",
    buttonText: "confirm email",
  });
};

export const sendForgetPasswordEmail = async (receiver, href) => {
  await sendEmail({
    receiver,
    href,
    subject: "Reset Password Link",
    text: "Reset Passwor from Task Flow App",
    title: "Click on the link below to reset password",
    buttonText: "reset password",
  });
};
