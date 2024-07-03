// backend/routes/sales.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a sale by ID
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (sale == null) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new sale
router.post('/', async (req, res) => {
  const sale = new Sale({
    productName: req.body.productName,
    quantity: req.body.quantity,
    price: req.body.price,
    customer: req.body.customer,
  });
  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a sale
router.put('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (sale == null) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    sale.productName = req.body.productName || sale.productName;
    sale.quantity = req.body.quantity || sale.quantity;
    sale.price = req.body.price || sale.price;
    sale.customer = req.body.customer || sale.customer;

    const updatedSale = await sale.save();
    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a sale
router.delete('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (sale == null) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    await sale.remove();
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
