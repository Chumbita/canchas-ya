import nodemailer from "nodemailer";

export class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMail({ to, subject, text, html }) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html,
      });

      console.log("Email enviado:", info.messageId);
      return info;
    } catch (error) {
      console.error("Error enviando el correo:", error);
      throw new Error("No se pudo enviar el correo");
    }
  }
}
