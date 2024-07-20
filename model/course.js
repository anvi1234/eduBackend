const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = new mongoose.Schema({
    courseId: { type: Number },
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseDuration: { type: Number, required: true },
    courseFees: { type: Number, required: true },
    courseImage: { type: String },
    courseRating: { type: Number, min: 0, max: 5, required: true },
    courseCategory: { type: String, required: true },
    courseSubCategory: { type: String, required: true }
});

CourseSchema.plugin(AutoIncrement, { inc_field: 'courseId' });

module.exports = mongoose.model('Course', CourseSchema);
