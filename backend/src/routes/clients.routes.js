const { getClients, getClientById, createClient, updateClient, deleteClient } = require('../controllers/clients.controller');
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/roles.middleware');


router.use(authenticate);

router.get('/', requireRole(['ADMIN', 'MANAGER']), getClients);

router.get('/:id', getClientById);

router.post('/', requireRole(['ADMIN']), createClient);

router.patch('/:id', requireRole(['ADMIN']), updateClient);

router.delete('/:id', requireRole(['ADMIN']), deleteClient);

module.exports = router;