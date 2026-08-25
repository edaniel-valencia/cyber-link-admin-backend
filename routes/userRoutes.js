const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAdmin } = require('../middlewares/authMiddleware');

// Auth endpoint
router.post('/loginWeb', userController.login);

// CRUD operations (Protected by Admin role)
router.get('/', requireAdmin, userController.getUsers);
router.post('/', requireAdmin, userController.createUser);
router.put('/:id', requireAdmin, userController.updateUser);
router.delete('/:id', requireAdmin, userController.deleteUser);

module.exports = router;
