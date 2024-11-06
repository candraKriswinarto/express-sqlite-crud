// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/items', asyncHandler(itemController.getAllItems));
router.get('/items/:id', asyncHandler(itemController.getItemById));
router.post('/items', asyncHandler(itemController.createItem));
router.put('/items/:id', asyncHandler(itemController.updateItem));
router.delete('/items/:id', asyncHandler(itemController.deleteItem));

router.delete('/items', itemController.deleteAllItems);

module.exports = router;
