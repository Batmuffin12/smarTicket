const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const rootEmail = process.env.ROOT_EMAIL;

const sendWelcomeMail = (email) => {
  sgMail.send({
    to: email,
    from: rootEmail,
    subject: "Thank you for joining us",
    text: "Hey! this email is for you to know her are happy that you chose to join us. thank you fo doing so and have a good ride!",
  });
};

module.exports = {
  sendWelcomeMail,
};
