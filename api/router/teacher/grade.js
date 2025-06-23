import express from "express"
import { addGrade, deleteGrade, updateGrade, getGrades } from "../../controllers/teacher/grade.js"
import { requireAuth } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", addGrade)
router.delete("/:id", requireAuth, deleteGrade)
router.put("/:id", requireAuth, updateGrade)
router.get("/", getGrades);

export default router