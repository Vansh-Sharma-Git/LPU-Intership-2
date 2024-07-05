
    const express = require('express');
    const router = express.Router();
    const inventoryController = require('../controller/inventoryController');
    const authMiddleware = require('../middleware/authMiddleware');

    router.get('/', authMiddleware, inventoryController.getItems);
    router.post('/', authMiddleware, inventoryController.addItem);

    module.exports = router;