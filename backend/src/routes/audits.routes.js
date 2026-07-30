const {
    getAudits,
    getAuditById,
    createAudit,
    updateAudit,
    deleteAudit,
    getAuditprogress
} = require('../controllers/audit.controller')

const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');
const express = require('express');
const router = express.Router();

// router.use(authenticate);

router.get('/', getAudits);

router.get('/:id', getAuditById);

router.get('/:id/progress', getAuditprogress);

router.post('/', requireRole("MANAGER"), createAudit);

router.patch('/:id', requireRole("MANAGER"), updateAudit);

router.delete('/:id', requireRole("MANAGER"), deleteAudit);

module.exports = router;