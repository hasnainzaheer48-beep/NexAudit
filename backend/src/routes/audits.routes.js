const {
    getAudits,
    getAuditById,
    createAudit,
    updateAudit,
    deleteAudit
} = require('../controllers/audit.controller')

const { authenticate } = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/', getAudits);

router.get('/:id', getAuditById);

router.post('/', authenticate, createAudit);

router.patch('/:id', updateAudit);

router.delete('/:id', deleteAudit);

module.exports = router;