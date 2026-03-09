import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { BASE_HREF } from "../lib/config.js";
import {
  sendForgetPasswordEmail,
  sendVerificationEmail,
} from "../lib/transporter.js";
import { getToken, getUserByBody, getUserByToken } from "../lib/userHelper.js";

const baseUrl = `${BASE_HREF}/api/auth`;

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  const userExists = await User.exists({ username });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const userExistsUsingEmail = await User.exists({ email });

  if (userExistsUsingEmail) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });

    const token = getToken(user, false);

    const href = `${baseUrl}/register/confirmEmail/${token}`;
    await sendVerificationEmail(email, href);

    const savedUser = await user.save();

    res.status(201).json({
      user: savedUser,
      message: `Email sent to ${email}, please check your email to verify your account`,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const confirmEmail = async (req, res) => {
  const token = req.params.token;
  const user = await getUserByToken(token, res);

  if (user.verified) {
    return res.status(400).json({ error: "email already verified" });
  }

  user.verified = true;

  try {
    await user.save();
    res.status(200).json({
      message: "email verified successfully, you can now login",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const loginUser = async (req, res) => {
  const { password } = req.body;

  try {
    const foundUser = await getUserByBody(req.body, res);

    if (!foundUser.verified) {
      return res.status(401).json({ error: "Email not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    await foundUser.populate("projects");
    const token = getToken(foundUser);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const logoutUser = async (req, res) => {
  const { token } = req.body;
  try {
    await getUserByToken(token, res);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const refetchToken = async (req, res) => {
  const { token } = req.body;

  const user = await getUserByToken(token, res);

  const newToken = getToken(user);

  res.status(200).json({ newToken });
};

const forgetPassword = async (req, res) => {
  try {
    const user = await getUserByBody(req.body);
    const token = getToken(user);

    const href = `${baseUrl}/resetPassword/${token}`;

    await sendForgetPasswordEmail(user.email, href);
    res.status(200).json({ message: "reset password link sent to email" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const resetPassword = async (req, res) => {
  const token = req.params.token;

  const { password } = req.body;

  try {
    const user = await getUserByToken(token, res);

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "password updated succesfully" });
  } catch (error) {
    res.status(500).json({ error: "unable to change password" });
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refetchToken,
  confirmEmail,
  forgetPassword,
  resetPassword,
};
