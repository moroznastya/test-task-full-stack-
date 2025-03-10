const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status, userId: req.user.id });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ message: 'Завдання не знайдено' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ message: 'Завдання не знайдено' });
    }

    await task.destroy();
    res.json({ message: 'Видалено' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
