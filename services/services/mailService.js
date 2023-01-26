const mailer = require("../configs/mailer")
const resetPasswordEmailTemplate = require("../templates/ResetPasswordEmail")

const sendResetPasswordEmail = (email, resetLink) => {
  return mailer.sendMail({
    from: 'no-reply@tibd.com',
    to: email,
    subject: 'Reset Password Notification',
    html: resetPasswordEmailTemplate(resetLink)
  })
}

module.exports = {
  sendResetPasswordEmail,
}