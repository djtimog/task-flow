import User from "../models/user.model.js";

const getTokenFromAuth = (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }
  return auth.split(" ")[1];
};

const getUserByBody = async (body) => {
  const { username, email } = body;

  let foundUser;

  if (username) {
    foundUser = await User.findOne({ username });
  } else if (email) {
    foundUser = await User.findOne({ email });
  }

  if (!foundUser) {
    return res.status(404).json({ error: "User not found" });
  }
  return foundUser;
};

export { getTokenFromAuth, getUserByBody };
