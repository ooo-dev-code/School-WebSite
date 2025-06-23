import express from "express"
import { addNews, deleteNews, updateNews } from "../../controllers/news/news.js"
import { requireAuth } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", addNews)
router.delete("/:id", requireAuth, deleteNews)
router.put("/:id", requireAuth, updateNews)

export default router