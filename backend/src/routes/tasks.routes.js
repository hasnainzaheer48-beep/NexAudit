const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, getTasksByAudit, updateTask, deleteTask, assignAuditor } = require('../controllers/tasks.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.use(authenticate);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.get('/audit/:id/', getTasksByAudit);
router.patch('/:id', updateTask);
router.patch('/:id/assign', assignAuditor);
router.delete('/:id', deleteTask);

module.exports = router;