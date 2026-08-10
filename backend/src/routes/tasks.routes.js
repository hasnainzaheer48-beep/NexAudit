const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, getTasksByAudit, updateTask, deleteTask, assignAuditor, updateTaskStatus, getTasksByAuditor, getTasksByManager } = require('../controllers/tasks.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');
const upload = require('../middlewares/upload.middleware');
const { uploadDocument, getDocumentsByTask } = require('../controllers/document.controller');
const { validateTask } = require('../middlewares/validateTask.middleware');
const { createComment, getCommentsByTask } = require('../controllers/comments.controller');

router.use(authenticate);

router.get('/', getTasks);
router.get('/:taskId/documents', validateTask, upload.single("file"), getDocumentsByTask);
router.get('/:taskId/comments', validateTask, getCommentsByTask);
router.get('/me', requireRole(['AUDITOR']), getTasksByAuditor);
router.get('/me/manager', requireRole(['MANAGER']), getTasksByManager);


router.get('/audit/:id', getTasksByAudit);


router.get('/:id', getTaskById);

router.post('/:taskId/documents', requireRole(["AUDITOR"]), validateTask, upload.single("file"), uploadDocument);
router.post('/:taskId/comments', validateTask, createComment);

router.patch('/:id/assign', requireRole(['MANAGER']), assignAuditor);
router.patch('/:id/status', requireRole(['AUDITOR']), updateTaskStatus);
router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);


module.exports = router;