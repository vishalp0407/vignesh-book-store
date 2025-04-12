import express from "express";

// controllers
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;
