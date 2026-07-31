const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const {
    getActivityLog,
    getActivityLogByEntityType,
    getActivityLogById
} = require('../controllers/activity.logger.controller');

router.use(authenticate);

router.get('/', getActivityLog);
router.get('/:id', getActivityLogById);
router.get('/entity/:entity_type', getActivityLogByEntityType);

module.exports = router;