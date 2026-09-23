const express = require('express');
const router = express.Router();
const { addUser, getUsers, deleteUser, getUserBookings } = require('../controllers/userController');

router.post('/', addUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.get('/:id/bookings', getUserBookings);

module.exports = router;
