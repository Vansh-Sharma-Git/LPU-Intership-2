// backend/routes/customersRoutes.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModels');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one customer
router.get('/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// Create customer
router.post('/', async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    contactInfo: req.body.contactInfo,
    address: req.body.address,
    GST: req.body.GST,
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update customer
router.patch('/:id', getCustomer, async (req, res) => {
  if (req.body.name != null) {
    res.customer.name = req.body.name;
  }
  if (req.body.contactInfo != null) {
    res.customer.contactInfo = req.body.contactInfo;
  }
  if (req.body.address != null) {
    res.customer.address = req.body.address;
  }
  if (req.body.GST != null) {
    res.customer.GST = req.body.GST;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete customer
router.delete('/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: 'Deleted Customer' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
}

module.exports = router;
