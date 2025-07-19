const Engineer = require('../');

// Add engineer
const addEngineer = async (req, res) => {
    try {
        const { name, phone, services, governorate, city } = req.body;

        if (!name || !phone || !services || !governorate || !city) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingEngineer = await Engineer.findOne({ phone });

        if (existingEngineer) {
            return res.status(400).json({
                status: 400,
                data: [],
                message: "already exist"
            })
        }

        const newEngineer = new Engineer({ name, phone, services, governorate, city });
        await newEngineer.save();

        res.status(201).json({ message: 'Engineer added successfully', engineer: newEngineer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all engineers
const getAllEngineers = async (req, res) => {
    try {
        const engineers = await Engineer.find().sort({ createdAt: -1 });
        res.status(200).json(engineers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update engineer
const updateEngineer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEngineer = await Engineer.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedEngineer) {
            return res.status(404).json({ message: 'Engineer not found' });
        }

        res.status(200).json({ message: 'Engineer updated successfully', engineer: updatedEngineer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete engineer
const deleteEngineer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Engineer.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Engineer not found' });
        }

        res.status(200).json({ message: 'Engineer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const engineerController = {
    addEngineer,
    getAllEngineers,
    updateEngineer,
    deleteEngineer
};
module.exports = engineerController;