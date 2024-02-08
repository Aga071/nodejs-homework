import formData from "form-data";
import Mailgun from "mailgun.js";
import "dotenv/config";
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendVerificationMail = (verificationToken, userMail) => {
  const data = {
    from: process.env.FROM_EMAIL,
    to: userMail,
    subject: "Verification User",
    text: `Verification User Please click the link http://localhost:3000/users/verify/${verificationToken} to verify your account`,
    html: `<h1>Verification User </h1> <p>Please click the link http://localhost:3000/users/verify/${verificationToken} to verify your account</p>`,
  };
  mg.messages
    .create(process.env.MAILGUN_DOMAIN, data)
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)); // logs any error
};
export { sendVerificationMail };
