var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var StudentSchema = new mongoose.Schema({
    studentId: { type: Number, unique: true },
    batchId: Number,
    studentName: String,
    mobileNumber: Number,
    dateOfJoining: Date,
    courseName:Number,
    email: String,
    parentName: String,
    parentMobileNumber: Number,
    parentEmail: String,
})

StudentSchema.plugin(AutoIncrement, { inc_field: 'studentId' });

module.exports = mongoose.model('Student', StudentSchema);