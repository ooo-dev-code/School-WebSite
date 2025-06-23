import express from "express"
import { addComment, deleteComment, updateComment } from "../../controllers/news/comment.js"
import { requireAuth } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", requireAuth, addComment)
router.delete("/:id", requireAuth, deleteComment)
router.put("/:id", requireAuth, updateComment)

export default router