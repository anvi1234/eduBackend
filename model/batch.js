var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var BatchSchema = new mongoose.Schema({
    batchId: Number,
    batchName: String,
    batchDate: String,
    batchCode: {
        type: String,
        required: true,
        unique: true // Ensures batchCode is unique
    }
})

BatchSchema.plugin(AutoIncrement, { inc_field: 'batchId' });

module.exports = mongoose.model('Batch',BatchSchema);