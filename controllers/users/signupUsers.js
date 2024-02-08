// import { signupUser, checkingEmail } from "../../models/users";
import { nanoid } from "nanoid";
import User from "../../models/User.js";
import gravatar from "gravatar";
import { sendVerificationMail } from "../../config/service/mail.service.js";
// import formData from "form-data";
// import Mailgun from "mailgun.js";
// import "dotenv/config";

const createUser = async (req, res, next) => {
  const { email, password } = req.body;

  //   const user = await checkingEmail(body);

  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ Status: 409, message: "Email in use" });
  }
  try {
    const avatarURL = gravatar.url(email, {
      s: "250",
      r: "pg",
      d: "identicon",
    });
    const newUser = new User({ email });
    await newUser.setPassword(password);
    newUser.avatarURL = avatarURL;
    newUser.verificationToken = nanoid();
    await newUser.save();
    // send mail
    // const mailgun = new Mailgun(formData);

    // const mg = mailgun.client({
    //   username: "api",
    //   key: process.env.MAILGUN_API_KEY,
    // });

    // const data = {
    //   from: "agata.wlazlak@gmail.com",
    //   to: "agata.wlazlak@gmail.com",
    //   subject: "Verification User",
    //   text: `Verification User Please click the link http://localhost:3000/users/verify/${newUser.verificationToken} to verify your account`,
    //   html: `<h1>Verification User </h1> <p>Please click the link http://localhost:3000/users/verify/${newUser.verificationToken} to verify your account</p>`,
    // };

    // mg.messages
    //   .create("sandbox1054ffc061464439accf48ae035581b5.mailgun.org", data)
    //   .then((msg) => console.log(msg)) // logs response data
    //   .catch((err) => console.log(err)); // logs any error
    sendVerificationMail(newUser.verificationToken, email);
    return res.status(201).json({
      status: 201,
      data: { email, avatarURL, subscription: "starter" },
    });
  } catch (err) {
    console.log("Signup not found", err.message);
  }
};

export { createUser };
