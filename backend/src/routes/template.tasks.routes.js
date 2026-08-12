const express = require('express');
const router = express.Router();
const {
    getTemplateTasks,
    getTemplateTaskById,
    createTemplateTask,
    updateTemplateTask,
    deleteTemplateTask,
    getTemplateTaskByAuditTemplate,
    archiveTemplateTask } = require('../controllers/template.tasks.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');


router.use(authenticate)

router.get('/', requireRole(['ADMIN', 'MANAGER']), getTemplateTasks);

router.get('/template/:templateId', requireRole(['ADMIN', 'MANAGER']), getTemplateTaskByAuditTemplate)
router.get('/:id', requireRole(['ADMIN', 'MANAGER']), getTemplateTaskById);


router.post('/', requireRole(['ADMIN', 'MANAGER']), createTemplateTask);

router.patch('/:id', requireRole(['ADMIN', 'MANAGER']), updateTemplateTask);
router.patch('/archive/:id', requireRole(['ADMIN', 'MANAGER']), archiveTemplateTask);

router.delete('/:id', requireRole(['ADMIN', 'MANAGER']), deleteTemplateTask);

module.exports = router;

