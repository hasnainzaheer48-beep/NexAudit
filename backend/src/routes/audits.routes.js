const {
    getAudits,
    getAuditById,
    createAudit,
    updateAudit,
    deleteAudit
} = require('../controllers/audit.controller')


const express = require('express');
const router = express.Router();

router.get('/', getAudits);

router.get('/:id', getAuditById);

router.post('/', createAudit);

router.patch('/:id', updateAudit);

router.delete('/:id', deleteAudit);

module.exports = router;