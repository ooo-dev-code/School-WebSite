import Hour from '../../models/office/hour.js';
import User from '../../models/user.js';

export const getHours = async (req, res) => {
    try {
        const hours = await Hour.find();
        res.status(200).json(hours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addHour = async (req, res) => {
    const { teacher, week, hour } = req.body;

    try {
        
        if (!week) {
            return res.status(400).json({ error: "Date is required" });
        }
        
        const user = await User.findById(teacher)
        if (!user) {
            return res.status(400).json({ error: "Teacher is required" });
        }

        if (user.type  != "Teacher") {
            return res.status(400).json({ error: "Unauthorized" });
        }

        const newHour = await Hour.create({ teacher, week, hour });
        res.status(201).json(newHour);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHour = async (req, res) => {
    const { id } = req.params;
    const { week, hour } = req.body;

    try {
        
        const updatedHour = await Hour.findByIdAndUpdate(id, { week, hour }, { new: true });
        if (!updatedHour) return res.status(404).json({ error: "Hour not found" });
        res.status(200).json(updatedHour);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteHour = async (req, res) => {
    const { id } = req.params;

    try {
        
        const hour = await Hour.findByIdAndDelete(id);
        if (!hour) return res.status(404).json({ error: "Hour not found" });
        res.status(200).json({ message: "Hour deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
