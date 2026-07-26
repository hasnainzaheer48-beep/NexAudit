const { getUsers } = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

router.get('/', getUsers);

module.exports = router; 
