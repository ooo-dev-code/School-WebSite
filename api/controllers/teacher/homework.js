import Homework from '../../models/teacher/homework.js';
import User from '../../models/user.js';

export const addHomework = async (req, res) => {
    const { teacher, student, content } = req.body;

    try {

        if (!teacher || !student || !content) {
            return res.status(400).json({ error: "Teacher, student, and content are required" });
        }
        
        const user = await User.findById(teacher)
        if (!user) {
            return res.status(400).json({ error: "Teacher is required" });
        }

        if (user.type  != "Teacher") {
            return res.status(400).json({ error: "Unauthorized" });
        }

        const homework = await Homework.create({ teacher, student, content, done: false });
        res.status(201).json(homework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHomework = async (req, res) => {
    const { id } = req.params;
    const { content, done } = req.body;

    try {
        
        const user = await User.findById(teacher)
        if (!user) {
            return res.status(400).json({ error: "Teacher is required" });
        }

        if (user.type  != "Teacher") {
            return res.status(400).json({ error: "Unauthorized" });
        }
        const homework = await Homework.findByIdAndUpdate(id, { content, done }, { new: true });
        if (!homework) return res.status(404).json({ error: "Homework not found" });
        res.status(200).json(homework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteHomework = async (req, res) => {
    const { id } = req.params;

    try {
        
        const user = await User.findById(teacher)
        if (!user) {
            return res.status(400).json({ error: "Teacher is required" });
        }

        if (user.type  != "Teacher") {
            return res.status(400).json({ error: "Unauthorized" });
        }
        
        const homework = await Homework.findByIdAndDelete(id);
        if (!homework) return res.status(404).json({ error: "Homework not found" });
        res.status(200).json({ message: "Homework deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHomework = async (req, res) => {
    try {

        const homework = await Homework.find();

        res.status(200).json(homework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
