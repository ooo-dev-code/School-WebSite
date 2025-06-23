import express from "express"
import { getUser, updateUser, getAllUser, deleteUser } from "../../controllers/auth/user.js"
import { requireAuth } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getAllUser)
router.get("/:id", getUser)
router.delete("/:id", requireAuth, deleteUser)
router.put("/:id", requireAuth, updateUser)

export default router