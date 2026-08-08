const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, getTasksByAudit, updateTask, deleteTask, assignAuditor, updateTaskStatus, getTasksByAuditor } = require('../controllers/tasks.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');
const upload = require('../middlewares/upload.middleware');
const { createDocument } = require('../controllers/document.controller');

router.use(authenticate);

router.get('/', getTasks);
router.get('/me', requireRole('AUDITOR'), getTasksByAuditor);


router.get('/audit/:id', getTasksByAudit);


router.get('/:id', getTaskById);

router.post('/:taskId/documents', upload.single("file"), createDocument);

router.patch('/:id/assign', requireRole('MANAGER'), assignAuditor);
router.patch('/:id/status', requireRole('AUDITOR'), updateTaskStatus);
router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);


module.exports = router;