const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, getTasksByAudit, updateTask, deleteTask, assignAuditor, updateTaskStatus, getTasksByAuditor } = require('../controllers/tasks.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');
const upload = require('../middlewares/upload.middleware');
const { uploadDocument, getDocumentsByTask } = require('../controllers/document.controller');
const { validateTask } = require('../middlewares/validateTask.middleware');

router.use(authenticate);

router.get('/', getTasks);
router.get('/me', requireRole('AUDITOR'), getTasksByAuditor);


router.get('/audit/:id', getTasksByAudit);


router.get('/:id', getTaskById);

router.get('/:taskId/documents', validateTask, upload.single("file"), getDocumentsByTask);
router.post('/:taskId/documents', validateTask, upload.single("file"), uploadDocument);

router.patch('/:id/assign', requireRole('MANAGER'), assignAuditor);
router.patch('/:id/status', requireRole('AUDITOR'), updateTaskStatus);
router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);


module.exports = router;