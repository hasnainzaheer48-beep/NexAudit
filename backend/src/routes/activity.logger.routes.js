const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const {
    getActivityLog,
    getActivityLogByEntityType,
    getActivityLogById,
    getActivityLogByUser
} = require('../controllers/activity.logger.controller');
const { requireRole } = require('../middlewares/roles.middleware');

router.use(authenticate);

router.get('/user', getActivityLogByUser);
router.get('/', requireRole(["ADMIN", "MANAGER"]), getActivityLog);
router.get('/:id', requireRole(["ADMIN", "MANAGER"]), getActivityLogById);
router.get('/entity/:entity_type', requireRole(["ADMIN", "MANAGER"]), getActivityLogByEntityType);

module.exports = router;