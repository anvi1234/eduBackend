const express = require('express');
const router = express.Router();
const batch = require('../controller/batch.controller');

// Define the routes and map them to controller methods
router.post('/add-batch', batch.createBatch);
router.get('/get-batch-by-id/:id', batch.getBatchById);
router.get('/get-batch', batch.getBatches);
router.delete('/delete-batch/:id', batch.deleteBatch);
router.put('/update-batch/:id', batch.updateBatch);

module.exports = router;
