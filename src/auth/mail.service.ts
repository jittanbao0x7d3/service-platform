import { Injectable } from "@nestjs/common"
import * as nodemailer from "nodemailer"

@Injectable()
export class MailService {
  private transporter: any // nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    await this.transporter.sendMail(mailOptions)
  }
}
