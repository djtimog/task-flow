import Comment from "../models/comment.model.js";

const createComment = async (req, res) => {
  const { user, project } = req;
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }
  const members = project.members.map((member) => member.member.toString());

  if (
    !members.includes(user._id.toString()) &&
    project.creator.toString() !== user._id.toString()
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const comment = new Comment({
    message,
    creator: user._id,
    project: project._id,
  });
  project.comments.push(comment._id);

  try {
    await project.save();
    await comment.save();
    res.status(200).json({ message: "Comment created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error: ${error.message}` });
  }
};

export default { createComment };
