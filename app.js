const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
