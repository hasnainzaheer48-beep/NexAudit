
const { getDocument } = require('../controllers/document.controller')
const express = require('express');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');
const router = express.Router();

router.use(authenticate);

router.get('/:id/open', getDocument);

module.exports = router;
