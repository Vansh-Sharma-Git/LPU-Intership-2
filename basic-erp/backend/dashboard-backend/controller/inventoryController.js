
const Inventory = require('../models/Inventory');

exports.getItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addItem = async (req, res) => {
    const { name, quantity } = req.body;
    try {
        const item = new Inventory({ name, quantity });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};