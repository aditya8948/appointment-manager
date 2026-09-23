const express = require('express');
const router = express.Router();
const { createBus, getBuses, getBusBookings } = require('../controllers/busController');

router.post('/', createBus);
router.get('/', getBuses);
router.get('/:id/bookings', getBusBookings);

module.exports = router;
