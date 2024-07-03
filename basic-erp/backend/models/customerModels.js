// backend/models/customerModel.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  address: { type: String, required: true },
  purchaseHistory: { type: [String], default: [] },
  preferences: { type: String, default: '' }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;


