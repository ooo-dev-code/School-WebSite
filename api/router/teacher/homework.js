import express from "express"
import { addHomework, deleteHomework, updateHomework, getHomework } from "../../controllers/teacher/homework.js"
import { requireAuth } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", addHomework)
router.delete("/:id", requireAuth, deleteHomework)
router.put("/:id", requireAuth, updateHomework)
router.get("/", requireAuth, getHomework)

export default router