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
    res.status(200).json(user);
  } catch (error) {
    res
      .status(404)
      .json({ error: `Can't find user by ID!:${id}`, message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true },
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAllUsers, getUserById, updateUser };
