const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskAnalytics,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.get('/analytics', getTaskAnalytics);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;