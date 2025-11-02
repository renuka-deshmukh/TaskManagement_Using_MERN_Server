const Task = require('../models/taskModel')
const Project = require('../models/projectModel')
const User = require('../models/userModel')

async function getAllTasks(req, res) {

  try {
    const tasks = await Task.find().populate("projectId", "name")
      .populate("assignTo", "name");
    res.status(200).json({ tasks: tasks, success: true })

  } catch (error) {
    console.error(" getAllTasks error", error);
    res.status(500).json({ message: "Server error" });
  }

}

async function getTaskById(req, res) {
  const id = req.params.id
  try {
    const task = await Task.findOne({ _id: id })
    if (!task) return res.status(404).json({ msg: "Task not found", success: false })

    res.status(200).json({ task: task, success: true })

  } catch (error) {
    console.error("getTaskById error", error);
    res.status(500).json({ message: "Server error" });
  }

}

async function createTask(req, res) {
  const { title, description, startDate, endDate, projectId, assignTo, status, priority } = req.body;
  const addedBy = req.user.id;
  try {

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // const assignedUser = await User.findById(assignTo);
    // if (!assignedUser) return res.status(404).json({ message: "Assigned user not found" });
    const newTask = await Task.create({
      title, description, startDate, endDate, addedBy, projectId, assignTo, status, priority
    });
    await newTask.save()
    res.status(200).json({ message: "Task added  successfully", success: true })

  } catch (error) {
    console.error("createTask error", error);
    res.status(500).json({ message: "Server error" });
  }

}

async function updateTask(req, res) {
  const { title, description, startDate, endDate, addedBy, projectId, assignTo, priority, status } = req.body;
  const id = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { title, description, startDate, endDate, addedBy, projectId, assignTo, priority, status },
      { new: true }
    );
    updatedTask.save()

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({
      msg: "Task updated successfully", success: true,
    });
  } catch (error) {
    console.error("updateTask error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

async function deleteTask(req, res) {

  try {
    const id = req.params.id;
    const deleteTask = await Task.findByIdAndDelete({ _id: id })
    res.status(200).json({ msg: "Task deleted successfully", success: true })

  } catch (error) {
    console.error("deleteTask error", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateTaskStatus(req, res) {
  const id = req.params.id
  const { status } = req.body
  try {
    const taskToUpdateStatus = await Task.findById(id)
    if (!taskToUpdateStatus) return res.status(404).json({ message: "Task not found" })

    const updateTaskStatus = await Task.findByIdAndUpdate(id, { status }, { new: true })
    res.status(200).json({ message: "Task status updated successfully" })

  } catch (error) {
    console.error(" updateTaskStatus error", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getTasksByProject(req, res) {
  const projectId = req.params.id

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const tasks = await Task.find({ projectId })
    res.status(200).json({ tasks, success: true })

  } catch (error) {
    console.error(" getting tasks error", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getTaksByAssigned(req, res) {
  const assignTo = req.params.id

  try {
    const user = await User.findById(assignTo);
    if (!user) return res.ststus(404).json({ message: "user not found" })

    const tasks = await Task.find({ assignTo })
    res.status(200).json({ tasks: tasks, success: true })

  } catch (error) {
    console.error(" getting tasks error", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getTasksByCreatedUser(req, res) {
  const addedBy = req.params.id
  try {
    const tasks = await Task.find({ addedBy })
    res.status(200).json({ success: true, tasks })

  } catch (error) {
    console.error(" getting tasks error", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createTask, getAllTasks, getTaskById, updateTask, deleteTask, updateTaskStatus, getTasksByProject,
  getTaksByAssigned, getTasksByCreatedUser
}