
const Batch = require('../model/batch'); // Adjust the path as needed

// Create a new batch
exports.createBatch = async (req, res) => {
    const { batchName, batchDate, batchCode } = req.body;

    try {
        // Attempt to create the batch
        const batch = new Batch({
            batchName,
            batchDate,
            batchCode
        });

        // Save the batch to the database
        const newBatch = await batch.save();

        // Respond with 201 Created and the newly created batch
        res.status(200).json(
            {
                statusCode:200,
                message: "Batch created successfully",
            }
        );
    } catch (error) {
        // Check if the error is due to batchCode uniqueness violation
        if (error.code === 11000 && error.keyPattern && error.keyPattern.batchCode) {
            return res.status(400).json({
                statusCode:400,
                message: 'Batch code must be unique' });
        }

        // Handle other errors
        res.status(400).json({ message: error.message });
    }
};


// Retrieve all batches
exports.getBatches = async (req, res) => {
    try {
        const batches = await Batch.find();
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a batch by ID
exports.getBatchById = async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id);
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        res.status(200).json(batch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a batch by ID
exports.deleteBatch = async (req, res) => {
    try {
        const batch = await Batch.findByIdAndDelete(req.params.id);
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        res.status(200).json({ message: 'Batch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a batch by ID
exports.updateBatch = async (req, res) => {
    const { batchName, batchDate, batchCode } = req.body;
    
    try {
        // Find the batch by ID
        let batch = await Batch.findById(req.params.id);

        // Check if the batch exists
        if (!batch) {
            return res.status(404).json({ 
                StatusCode:404,
                message: 'Batch not found' });
        }

        // Update batch fields
        batch.batchName = batchName;
        batch.batchDate = batchDate;

        // Check if batchCode is being updated
        if (batchCode && batchCode !== batch.batchCode) {
            // Check if the new batchCode is already in use
            const existingBatch = await Batch.findOne({ batchCode: batchCode });
            if (existingBatch && existingBatch.id.toString() !== req.params.id) {
                return res.status(400).json({ 
                    StatusCode: 400,
                    message: 'Batch code must be unique' });
            }
            batch.batchCode = batchCode;
        }

        // Save the updated batch
        batch = await batch.save();

        // Respond with 200 OK and the updated batch object
        res.status(200).json(
            {
                StatusCode:200,
                message: "Batch updated successfully",
            }
        );
    } catch (error) {
        // Handle other errors
        res.status(500).json({ message: error.message });
    }
};