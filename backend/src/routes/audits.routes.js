const {
    getAudits,
    getAuditById,
    createAudit,
    updateAudit,
    deleteAudit,
    getAuditprogress,
    finishAudit,
    getAuditsByManager,
    archiveAudit
} = require('../controllers/audit.controller')

const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');
const express = require('express');
const router = express.Router();

router.use(authenticate);

router.get('/', requireRole(["ADMIN"]), getAudits);

router.get('/me', requireRole(["MANAGER"]), getAuditsByManager)

router.get('/:id', getAuditById);
router.get('/:id/progress', getAuditprogress);

router.post('/', requireRole(["MANAGER"]), createAudit);

router.patch('/:id/complete', finishAudit);
router.patch('/:id', requireRole(["MANAGER"]), updateAudit);
router.patch('/archive/:id', requireRole(["MANAGER", "ADMIN"]), archiveAudit);

router.delete('/:id', requireRole(["MANAGER"]), deleteAudit);

module.exports = router;