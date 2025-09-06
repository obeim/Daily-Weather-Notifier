import nodemailer from "nodemailer";
import env from "./env";

export const transporter = nodemailer.createTransport({
  service: env.nodemailer.service,
  auth: {
    user: env.nodemailer.user,
    pass: env.nodemailer.pass,
  },
});
