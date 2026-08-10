const express = require('express');
const { getAuditStats } = require('../controllers/dashboard.controller');
const router = express.Router();


router.get('/audits/stats', getAuditStats);

module.exports = router