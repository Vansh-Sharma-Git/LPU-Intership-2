const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const connectDB = require('./config/db');

require('dotenv').config();
require('./cron/deactivateInactiveUsers');

const app = express();

app.use(cors());

connectDB();

app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api', customerRoutes);
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/contacts', require('./routes/contact')); // Ensure this path is correct
app.use('/api/leads', require('./routes/leads')); // Ensure this path is correct
app.use('/api/sales', require('./routes/sales'));
app.use('/api/communications', require('./routes/communications'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
