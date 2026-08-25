require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const settingRoutes = require('./routes/settingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir la carpeta uploads estáticamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// Note: The frontend calls /api-tsoftware/users/loginWeb
app.use('/api-tsoftware/users', userRoutes);
app.use('/api-tsoftware/roles', roleRoutes);
app.use('/api-tsoftware/settings', settingRoutes);
app.use('/api-tsoftware/services', serviceRoutes);
app.use('/api-tsoftware/service-requests', serviceRequestRoutes);

// Basic route to check health
app.get('/', (req, res) => {
  res.send('Cyber Link Admin Backend API is running');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
