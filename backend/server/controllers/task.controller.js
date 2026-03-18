import { getUserByBody } from "../lib/userHelper.js";
import Task from "../models/task.model.js";

const createTask = async (req, res) => {
  const { user, project } = req;
  const { title, description, assignee } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!assignee) {
    return res.status(400).json({ error: "Assignee is required" });
  }
  if (project.creator.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const members = project.members.map((member) => member.member.toString());

  if (
    !members.includes(user._id.toString()) &&
    project.creator.toString() !== user._id.toString()
  ) {
    return res
      .status(403)
      .json({ error: "Forbidden: Assignee is not a member of the project" });
  }

  const invitedUser = await getUserByBody(assignee, res);

  if (!invitedUser) {
    return res.status(404).json({ error: "Invited user not found" });
  }

  const task = new Task({
    title,
    description,
    assignedTo: invitedUser._id,
    project: project._id,
    status: false,
  });

  project.tasks.push(task._id);
  invitedUser.assignedTasks.push(task._id);
  try {
    await project.save();
    await task.save();
    await invitedUser.save();
    res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error: ${error.message}` });
  }
};

const updateTaskStatus = async (req, res) => {
  const { user, project } = req;
  const { taskId, isDone } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.project.toString() !== project._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }
    if (task.assignedTo.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }
    task.isDone = isDone;
    await task.save();
    res.status(200).json({ message: "Task status updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error: ${error.message}` });
  }
};

export default { createTask, updateTaskStatus };
