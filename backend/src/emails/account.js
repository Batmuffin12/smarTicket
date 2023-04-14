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

const sendContactUsEmail = async ({ email, subject, name }) => {
  try {
    await sgMail.send({
      to: rootEmail,
      from: rootEmail,
      subject: `from ${email}: name: ${name}`,
      text: subject,
    });
    return {
      result: "mail delivered successfully",
      status: 200,
    };
  } catch (e) {
    return {
      response: e || e.message,
      status: 500,
    };
  }
};

module.exports = {
  sendWelcomeMail,
  sendContactUsEmail,
};
