const { Booking, User, Bus } = require('../models');

const createBooking = async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;

    if (!userId || !busId || !seatNumber) {
      return res.status(400).json({ error: 'userId, busId, and seatNumber are required' });
    }

    // Verify user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify bus exists
    const bus = await Bus.findByPk(busId);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    const booking = await Booking.create({ userId, busId, seatNumber });
    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Bus, attributes: ['busNumber', 'totalSeats', 'availableSeats'] },
      ],
    });
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createBooking, getBookings };
