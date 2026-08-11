const express = require('express');
const { getAuditStats, getOverdueAudits } = require('../controllers/dashboard.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(authenticate);


router.get('/manager/stats', getAuditStats);
router.get('/manager/overdue', getOverdueAudits);

module.exports = router