import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { SECRET } from "./config.js";

const getTokenFromAuth = (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }
  return auth.split(" ")[1];
};

const getUserByBody = async (body, res) => {
  const { username, email } = body;

  let foundUser;

  if (username) {
    foundUser = await User.findOne({ username });
  } else if (email) {
    foundUser = await User.findOne({ email });
  }

  return foundUser;
};

const getUserByToken = async (token, res) => {
  const decodedToken = jwt.verify(token, SECRET);
  const user = await User.findById(decodedToken.user.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return user;
};

const getToken = (user, expire = true) => {
  if (expire) {
    return jwt.sign({ user }, SECRET, {
      expiresIn: "1d",
    });
  }
  return jwt.sign({ user }, SECRET);
};

export { getTokenFromAuth, getUserByBody, getUserByToken, getToken };
