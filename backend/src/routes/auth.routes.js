const { login, getCurrentUser } = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');


router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);

module.exports = router;