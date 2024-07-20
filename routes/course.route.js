const express = require('express');
const router = express.Router();
const courseController = require('../controller/course.controller');

router.post('/create-course', courseController.createCourse);
router.get('/getcourse', courseController.getAllCourses);
router.get('/get-course-byid/:id', courseController.getCourseById);
router.delete('/delete-course/:id', courseController.deleteCourse);
router.patch('/update-course/:id', courseController.updateCourse);

module.exports = router;
