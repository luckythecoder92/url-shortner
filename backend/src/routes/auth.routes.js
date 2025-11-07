import express from "express";
// import { registerUser, loginUser } from "../controller/user.controller.js";
import { getCurrentUser, login_User, logout_User, register_User } from "../controller/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register_User);
router.post("/login", login_User);
router.post('/logout',logout_User)
router.get('/me', authMiddleware, getCurrentUser);

export default router;