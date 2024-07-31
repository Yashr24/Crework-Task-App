import Task from '../models/taskModel.js';

const createTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  const userId = req.user; // Assumes user ID is set by auth middleware
  try {
    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: userId,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user; // Assumes user ID is set by auth middleware
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', success: false });
  }
}

export { createTask, getTasks, deleteTask};
