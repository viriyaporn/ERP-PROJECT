const nodeMailer = require("nodemailer");

const SMTPTransport = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: process.env.ENV !== 'DEV',
  }
}

const mailer = nodeMailer.createTransport(SMTPTransport)

module.exports = mailer