import { getTokenFromAuth, getUserByToken } from "../lib/userHelper.js";
import User from "../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    await user.populate("projects");
    await user.populate("assignedTasks");
    await user.populate("participatingProjects");
    res.status(200).json(user);
  } catch (error) {
    res
      .status(404)
      .json({ error: `Can't find user by ID!:${id}`, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { username } = req.body;
  const token = getTokenFromAuth(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await getUserByToken(token, res);
  if (user._id.toString() !== id) {
    console.log(user);
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { username } },
      { returnDocument: "after" },
    );
    await user.populate("projects");
    await user.populate("assignedTasks");
    await user.populate("participatingProjects");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAllUsers, getUserById, updateProfile };
