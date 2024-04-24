import nodemailer from "nodemailer";

const EmailService = {
  sendEmail: async (mailOptions: Object) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL_ID!,
        pass: process.env.AUTH_APP_CODE!,
      },
    });

    try {
      const info = await transporter.sendMail(mailOptions);
      return 1;
    } catch (err) {
      console.log(err);
      return 0;
    }
  },
};

export default EmailService;
