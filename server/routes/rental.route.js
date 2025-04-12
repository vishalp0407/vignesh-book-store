import express from "express";
import authMiddleware from "../middelwares/auth.middleware.js";
import { rentBook, returnBook } from "../controllers/rental.controller.js";

const router = express.Router();

router.post("/rent", authMiddleware, rentBook);
router.post("/return", authMiddleware, returnBook);

export default router;
