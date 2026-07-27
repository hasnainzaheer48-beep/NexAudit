const { getAuditTemplates,
    getAuditTemplateById,
    createAuditTemplate,
    updateAuditTemplate,
    deleteAuditTemplate } = require('../controllers/audit.templates.controller');

const express = require('express');
const router = express.Router();

router.get('/', getAuditTemplates);
router.get('/:id', getAuditTemplateById);
router.post('/', createAuditTemplate);
router.patch('/:id', updateAuditTemplate);
router.delete('/:id', deleteAuditTemplate);

module.exports = router;