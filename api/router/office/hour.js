import express from "express"
import { getHours ,addHour, deleteHour, updateHour } from "../../controllers/office/hour.js"
import { requireAuth } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getHours)
router.post("/", addHour)
router.delete("/:id", requireAuth, deleteHour)
router.put("/:id", requireAuth, updateHour)

export default router