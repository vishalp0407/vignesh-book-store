import BookModel from "../models/book.model.js";

/**
 * @desc createBook
 * @route post/api/v1/books/
 * @acces private
 */
const createBook = async (req, res) => {
  try {
    const book = new BookModel(req.body);
    if (req.file) {
      book.coverImage = req.file.filename;
    }
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, search } = req.query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const books = await BookModel.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await BookModel.countDocuments(filter);

    res.json({ total, page: Number(page), limit: Number(limit), books });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// single book
const getBookById = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// update book
const updateBook = async (req, res) => {
  try {
    const updated = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// delete book
const deleteBook = async (req, res) => {
  try {
    const deleted = await BookModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
export { createBook, getBooks, getBookById, updateBook, deleteBook };
