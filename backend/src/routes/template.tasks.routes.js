const express = require('express');
const router = express.Router();
const {
    getTemplateTasks,
    getTemplateTaskById,
    createTemplateTask,
    updateTemplateTask,
    deleteTemplateTask,
    getTemplateTaskByAuditTemplate } = require('../controllers/template.tasks.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.use(authenticate)

router.get('/', getTemplateTasks);

router.get('/template/:templateId', getTemplateTaskByAuditTemplate)
router.get('/:id', getTemplateTaskById);


router.post('/', createTemplateTask);

router.patch('/:id', updateTemplateTask);

router.delete('/:id', deleteTemplateTask);

module.exports = router;

