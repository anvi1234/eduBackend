const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');

router.post('/create-student', studentController.createStudent);
router.get('/getstudents', studentController.getStudents);
router.get('/get-student-byid/:id', studentController.getStudentById);
router.delete('/delete-students/:id', studentController.deleteStudent);
router.patch('/update-student/:id', studentController.updateStudent);

module.exports = router;
