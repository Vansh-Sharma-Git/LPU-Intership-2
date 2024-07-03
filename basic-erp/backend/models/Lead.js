// backend/models/Lead.js
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  source: { type: String, required: true },
  status: { type: String, required: true },
  potentialValue: { type: Number, required: true },
});

module.exports = mongoose.model('Lead', LeadSchema);
