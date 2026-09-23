const sequelize = require('../config/db');
const User = require('./User');
const Bus = require('./Bus');
const Booking = require('./Booking');

// ===== One-to-Many: User -> Bookings =====
// A user can make multiple bookings
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// ===== One-to-Many: Bus -> Bookings =====
// A bus can have multiple bookings
Bus.hasMany(Booking, { foreignKey: 'busId' });
Booking.belongsTo(Bus, { foreignKey: 'busId' });

module.exports = { sequelize, User, Bus, Booking };
