// backend/models/Sale.js
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  customer: { type: String, required: true },
});

module.exports = mongoose.model('Sale', SaleSchema);
