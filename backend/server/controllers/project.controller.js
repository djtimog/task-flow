import Project from "../models/project.model.js";
import { getToken, getUserByBody, getUserByToken } from "../lib/userHelper.js";
import { BASE_HREF } from "../lib/config.js";
import { sendInvitationLink } from "../lib/transporter.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Task from "../models/task.model.js";

const baseUrl = `${BASE_HREF}/dashboard/projects`;

const createProject = async (req, res) => {
  const { title, description } = req.body;
  const user = req.user;
  try {
    const project = new Project({ title, description, creator: user._id });
    const savedProject = await project.save();
    user.projects = [...user.projects, savedProject._id];
    await user.save();

    await savedProject.populate("creator");
    await savedProject.populate({
      path: "tasks",
      populate: {
        path: "assignedTo",
        model: "User",
      },
    });
    await savedProject.populate({
      path: "members",
      populate: {
        path: "member",
        model: "User",
      },
    });
    await savedProject.populate({
      path: "comments",
      populate: { path: "creator", model: "User" },
    });
    res.status(201).json({ message: "Project created", data: savedProject });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllUserProjects = async (req, res) => {
  const user = req.user;
  try {
    const projects = await Project.find({ creator: user._id }).populate(
      "creator",
    );
    await projects.populate("creator");
    await projects.populate({
      path: "tasks",
      populate: {
        path: "assignedTo",
        model: "User",
      },
    });
    await projects.populate({
      path: "members",
      populate: {
        path: "member",
        model: "User",
      },
    });
    await projects.populate({
      path: "comments",
      populate: { path: "creator", model: "User" },
    });
    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProjectById = async (req, res) => {
  const { user, project } = req;
  try {
    const members = project.members.map((member) => member.member.toString());

    if (
      project.creator._id.toString() !== user._id.toString() &&
      !members.includes(user._id.toString())
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await project.populate("creator");
    await project.populate({
      path: "tasks",
      populate: {
        path: "assignedTo",
        model: "User",
      },
    });
    await project.populate({
      path: "members",
      populate: {
        path: "member",
        model: "User",
      },
    });
    await project.populate({
      path: "comments",
      populate: { path: "creator", model: "User" },
    });
    res.status(200).json({ data: project });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    await projects.populate("creator");
    await projects.populate({
      path: "tasks",
      populate: {
        path: "assignedTo",
        model: "User",
      },
    });
    console.log("i am here");
    await projects.populate({
      path: "members",
      populate: {
        path: "member",
        model: "User",
      },
    });
    await projects.populate({
      path: "comments",
      populate: { path: "creator", model: "User" },
    });
    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const editProject = async (req, res) => {
  const { user, project } = req;

  const { title, description } = req.body;
  try {
    if (project.creator._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    const updatedProject = await project.save();
    await updatedProject.populate("creator");
    await updatedProject.populate({
      path: "tasks",
      populate: {
        path: "assignedTo",
        model: "User",
      },
    });
    await updatedProject.populate({
      path: "members",
      populate: {
        path: "member",
        model: "User",
      },
    });
    await updatedProject.populate({
      path: "comments",
      populate: { path: "creator", model: "User" },
    });
    res.status(200).json({ message: "Project updated", data: updatedProject });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteProject = async (req, res) => {
  const { user, project } = req;

  try {
    if (project.creator._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Comment.deleteMany({ project: project._id });
    await Task.deleteMany({ project: project._id });

    await User.updateMany(
      { participatingProjects: project._id },
      { $pull: { participatingProjects: project._id } },
    );

    await Project.findByIdAndDelete(project.id);

    user.projects = user.projects.filter(
      (proj) => proj !== project.creator._id,
    );
    await user.save();

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const inviteToProject = async (req, res) => {
  const { user, project } = req;

  try {
    if (project.creator._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const invitedUser = await getUserByBody(req.body, res);
    if (!invitedUser) {
      return res.status(404).json({ error: "Invited user not found" });
    }

    const members = project.members.map((member) => member.member.toString());
    if (
      members.includes(invitedUser._id.toString()) ||
      invitedUser._id.toString() === project.creator._id.toString()
    ) {
      return res
        .status(400)
        .json({ error: "User is already a member of the project" });
    }

    project.members = [...project.members, { member: invitedUser._id }];

    const invitationToken = getToken(invitedUser, false);

    const href = `${baseUrl}/${project.id}/acceptInvite/${invitationToken}`;
    await sendInvitationLink(invitedUser.email, href, project.title);
    await project.save();
    res
      .status(200)
      .json({ message: `Invitation sent to ${invitedUser.email}` });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const acceptInviteToProject = async (req, res) => {
  const { token: invitationToken } = req.params;
  const { user, project } = req;

  try {
    const invitedUser = await getUserByToken(invitationToken, res);
    if (invitedUser._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const participatingProjects = user.participatingProjects.map((proj) =>
      proj.toString(),
    );

    if (participatingProjects.includes(project._id.toString())) {
      return res.status(400).json({ error: "Invitation accepted already" });
    }

    user.participatingProjects = [...user.participatingProjects, project._id];
    await user.save();

    project.members = project.members.map((member) => {
      if (member.member.toString() === invitedUser._id.toString()) {
        return { member: member.member, inviteStatus: true };
      }
      return member;
    });

    await project.save();
    res.status(200).json({ message: "Invitation accepted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  createProject,
  getAllUserProjects,
  getProjectById,
  deleteProject,
  getProjects,
  editProject,
  inviteToProject,
  acceptInviteToProject,
};
