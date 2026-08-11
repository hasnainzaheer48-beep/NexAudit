const express = require('express');
const { getAuditStats, getOverdueAudits, getUpcomingAudits, getTasksStats, getOverdueTasks } = require('../controllers/dashboard.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(authenticate);


router.get('/manager/stats', getAuditStats);
router.get('/manager/overdue', getOverdueAudits);
router.get('/manager/upcoming', getUpcomingAudits);

router.get('/auditor/stats', getTasksStats);
router.get('/auditor/overdue', getOverdueTasks);

module.exports = router