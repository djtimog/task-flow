import Project from "../models/project.model.js";
import { getUserByToken } from "../lib/userHelper.js";

const createProject = async (req, res) => {
  const { title, description, token } = req.body;
  try {
    const user = await getUserByToken(token, res);
    const project = new Project({ title, description, creator: user._id });
    const savedProject = await project.save();
    user.projects = [...user.projects, savedProject._id];
    await user.save();

    await savedProject.populate("creator");
    res.status(201).json({ message: "Project created", data: savedProject });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllUserProjects = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await getUserByToken(token, res);
    const projects = await Project.find({ creator: user._id }).populate(
      "creator",
    );

    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;
  try {
    const project = await Project.findById(id).populate("creator");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const user = await getUserByToken(token, res);
    if (project.creator._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.status(200).json({ data: project });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("creator");
    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, token } = req.body;
  try {
    const user = await getUserByToken(token, res);
    const project = await Project.findById(id).populate("creator");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.creator._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.status(200).json({ message: "Project updated", data: updatedProject });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;
  try {
    const user = await getUserByToken(token, res);
    const project = await Project.findById(id).populate("creator");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.creator._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await project.remove();
    user.projects = user.projects.filter(
      (proj) => proj === project.creator._id,
    );
    await user.save();
    res.status(200).json({ message: "Project deleted" });
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
};
