const express = require('express');
const router = express.Router();

router.use('/batch', require('./batch.route'));
router.use('/student', require('./student.route'));
router.use('/course', require('./batch.route'));

module.exports = router;
