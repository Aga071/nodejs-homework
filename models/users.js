// import { User } from "./User";

// const checkingEmail = async (body) => {
//   try {
//     const { email } = body;
//     const user = await User.findOne({ email }).lean();
//     return user;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const signupUser = async (body) => {
//   try {
//     const newUser = await User.create(body);
//     return newUser;
//   } catch (err) {
//     console.log("Signup not found", err.message);
//   }
// };

// export { signupUser, checkingEmail };
