const Student = require('../model/student');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        const newStudent = await student.save();
        res.status(200).json({ statusCode: 200, message: "Student created successfully", data: newStudent });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ statusCode: 400, message: 'Student ID must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Retrieve all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ statusCode: 404, message: 'Student not found' });
        }

        Object.assign(student, req.body);
        student = await student.save();

        res.status(200).json({ statusCode: 200, message: "Student updated successfully", data: student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
