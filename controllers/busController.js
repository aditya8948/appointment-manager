const { Bus } = require('../models');

const createBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;

    if (!busNumber || !totalSeats || availableSeats === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const bus = await Bus.create({ busNumber, totalSeats, availableSeats });
    res.status(201).json({
      message: 'Bus created successfully',
      bus,
    });
  } catch (err) {
    console.error('Error creating bus:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    res.status(200).json(buses);
  } catch (err) {
    console.error('Error fetching buses:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBusBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const { Booking, User } = require('../models');

    const bus = await Bus.findByPk(id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    const bookings = await Booking.findAll({
      where: { busId: id },
      include: {
        model: User,
        attributes: ['name', 'email'],
      },
    });

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bus bookings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createBus, getBuses, getBusBookings };
