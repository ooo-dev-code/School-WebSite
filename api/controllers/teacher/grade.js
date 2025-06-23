import Grade from '../../models/teacher/grade.js';
import User from '../../models/user.js';

export const addGrade = async (req, res) => {
  const { teacher, student, grade, maxGrade, description } = req.body;

  try {
    const user = await User.findById(teacher);
    if (!user || user.type !== "Teacher") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const newGrade = await Grade.create({
      teacher,
      student,
      grade,
      maxGrade,
      description
    });

    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateGrade = async (req, res) => {
    const { id } = req.params;
    const { maxGrade, grade } = req.body;

    try {
        
        const user = await User.findById(teacher)
        if (!user) {
            return res.status(400).json({ error: "Teacher is required" });
        }

        if (user.type  != "Teacher") {
            return res.status(400).json({ error: "Unauthorized" });
        }

        const updatedGrade = await Grade.findByIdAndUpdate(id, { maxGrade, grade }, { new: true });
        if (!updatedGrade) return res.status(404).json({ error: "Grade not found" });
        res.status(200).json(updatedGrade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteGrade = async (req, res) => {
    const { id } = req.params;

    try {
        
        const user = await User.findById(teacher)
        if (!user) {
            return res.status(400).json({ error: "Teacher is required" });
        }

        if (user.type  != "Teacher") {
            return res.status(400).json({ error: "Unauthorized" });
        }

        const grade = await Grade.findByIdAndDelete(id);
        if (!grade) return res.status(404).json({ error: "Grade not found" });
        res.status(200).json({ message: "Grade deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getGrades = async (req, res) => {
    try {

        const grade = await Grade.find();

        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
