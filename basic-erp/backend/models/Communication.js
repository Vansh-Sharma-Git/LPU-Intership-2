// backend/models/Communication.js
const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  date: { type: Date, default: Date.now },
  method: String,
  notes: String,
});

module.exports = mongoose.model('Communication', communicationSchema);
