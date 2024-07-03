// backend/routes/communications.js
const express = require('express');
const router = express.Router();
const Communication = require('../models/Communication');

// Get all communications
router.get('/', async (req, res) => {
  try {
    const communications = await Communication.find().populate('customerId');
    res.json(communications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one communication
router.get('/:id', getCommunication, (req, res) => {
  res.json(res.communication);
});

// Create communication
router.post('/', async (req, res) => {
  const communication = new Communication({
    customerId: req.body.customerId,
    date: req.body.date,
    method: req.body.method,
    notes: req.body.notes,
  });

  try {
    const newCommunication = await communication.save();
    res.status(201).json(newCommunication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update communication
router.patch('/:id', getCommunication, async (req, res) => {
  if (req.body.customerId != null) {
    res.communication.customerId = req.body.customerId;
  }
  if (req.body.date != null) {
    res.communication.date = req.body.date;
  }
  if (req.body.method != null) {
    res.communication.method = req.body.method;
  }
  if (req.body.notes != null) {
    res.communication.notes = req.body.notes;
  }

  try {
    const updatedCommunication = await res.communication.save();
    res.json(updatedCommunication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete communication
router.delete('/:id', getCommunication, async (req, res) => {
  try {
    await res.communication.remove();
    res.json({ message: 'Deleted Communication' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCommunication(req, res, next) {
  let communication;
  try {
    communication = await Communication.findById(req.params.id).populate('customerId');
    if (communication == null) {
      return res.status(404).json({ message: 'Cannot find communication' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.communication = communication;
  next();
}

module.exports = router;
