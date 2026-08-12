const { getUsers, getUserById, createUser, updateUser, deleteUser, unassignUser } = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');

router.use(authenticate);


router.get('/', requireRole(['ADMIN', 'AUDITOR', 'MANAGER']), getUsers);

router.get('/:id', requireRole(['ADMIN', 'AUDITOR', 'MANAGER']), getUserById);

router.post('/', requireRole(['ADMIN']), createUser);



router.patch('/:id', requireRole(['ADMIN']), updateUser);
router.patch('/deactivate/:id', requireRole(['ADMIN']), unassignUser);


router.delete('/:id', requireRole(['ADMIN']), deleteUser);

module.exports = router; 
