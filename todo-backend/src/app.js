require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('../sequelize.config');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

sequelize.sync()
  .then(() => console.log(' Database synced'))
  .catch(err => console.log(' Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));


