const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sortBy, order = 'desc', page = 1, limit = 6 } = req.query;

    const query = { userId: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    let sortOption = { createdAt: -1 };
    if (sortBy) {
      sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query).sort(sortOption).skip(skip).limit(Number(limit));

    res.json({
      tasks,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    next(error);
  }
};

const getTaskAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;

    stats.forEach((item) => {
      totalTasks += item.count;
      if (item._id === 'Done') {
        completedTasks += item.count;
      } else {
        pendingTasks += item.count;
      }
    });

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskAnalytics,
};