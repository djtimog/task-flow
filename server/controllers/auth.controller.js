import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { BASE_HREF, SECRET } from "../lib/config.js";
import jwt from "jsonwebtoken";
import {
  sendForgetPasswordEmail,
  sendVerificationEmail,
} from "../lib/transporter.js";
import { getUserByBody } from "../lib/userHelper.js";

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

    const token = jwt.sign({ username, email }, SECRET);

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

  const decodedToken = jwt.verify(token, SECRET);

  const { email } = decodedToken;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  if (user.verified) {
    return res.status(400).json({ error: "email already verified" });
  }
  user.verified = true;
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const loginUser = async (req, res) => {
  const { password } = req.body;

  const foundUser = await getUserByBody(req.body);

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    { username: foundUser.username, id: foundUser.id },
    SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.status(200).json({ token, user: foundUser });
};

const logoutUser = async (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, SECRET);
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  res.status(200).json({ message: "Logout successful" });
};

const refetchToken = (req, res) => {
  const { token } = req.body;

  const user = jwt.verify(token, SECRET);

  if (!user) {
    return res.status(400).json({ error: "user not found using token" });
  }
  const newToken = jwt.sign({ ...user }, SECRET);

  res.status(200).json({ newToken });
};

const forgetPassword = async (req, res) => {
  try {
    const user = await getUserByBody(req.body);
    const token = jwt.sign({ username: user.username, id: user.id }, SECRET, {
      expiresIn: "1d",
    });

    const href = `${baseUrl}/resetPassword/${token}`;

    await sendForgetPasswordEmail(user.email, href);
    res.status(200).json({ message: "reset password link sent to email" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const resetPassword = async (req, res) => {
  const token = req.params.token;

  const decodedToken = jwt.verify(token, SECRET);
  const { password } = req.body;

  try {
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

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
