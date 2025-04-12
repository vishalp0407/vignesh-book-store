import express from "express";
import upload from "../middelwares/upload.middleware.js";
import authMiddleware from "../middelwares/auth.middleware.js";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("coverImage"), createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);
export default router;
