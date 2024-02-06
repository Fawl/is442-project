import { render } from '@react-email/render';
import nodemailer, { Transporter } from 'nodemailer';
import { Email } from '.';

const email = process.env.EMAIL
const email_pass=process.env.EMAIL_PASS

const sendEmail = async (options: nodemailer.SendMailOptions, transporter: Transporter) => {
  const emailHtml = render(<Email/>);

  await transporter.sendMail({
    ...options,
    html: emailHtml,
  });
};

const handler = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email, // Your Gmail email address
      pass: email_pass, // Your Gmail password or application-specific password
    },
  });

  const options = {
    from: 'ticketeer101@gmail.com',
    to: 'tanchiyong00@gmail.com', 
    subject: 'Hello from Gmail SMTP', 
    text: 'Hello, this is a test email sent using Gmail SMTP!', 
  };

  try {
    await sendEmail(options, transporter);
    console.log("ok")
  } catch (error) {
    console.error('Error sending email:', error);
    console.log("internal server error")
  }
};

export default handler;
