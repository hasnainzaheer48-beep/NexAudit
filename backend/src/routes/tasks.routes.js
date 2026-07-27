const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/tasks.controller');

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;