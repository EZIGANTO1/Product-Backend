const express = require('express');
const { registerUser, loginUser, updateUser, getAllUsers, getUsersById, deleteUser } = require('../controller/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.get('/:id', getUsersById);
router.delete('/:id', deleteUser);

module.exports = router;