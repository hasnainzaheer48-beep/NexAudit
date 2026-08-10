const { getAuditTemplates,
    getAuditTemplateById,
    createAuditTemplate,
    updateAuditTemplate,
    deleteAuditTemplate } = require('../controllers/audit.templates.controller');

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');


router.use(authenticate);

router.get('/', requireRole(["ADMIN", "MANAGER"]), getAuditTemplates);
router.get('/:id', requireRole(["ADMIN", "MANAGER"]), getAuditTemplateById);
router.post('/', requireRole(["ADMIN", "MANAGER"]), createAuditTemplate);
router.patch('/:id', requireRole(["ADMIN", "MANAGER"]), updateAuditTemplate);
router.delete('/:id', requireRole(["ADMIN", "MANAGER"]), deleteAuditTemplate);

module.exports = router;