import RentalModel from "../models/rental.model.js";
import BookModel from "../models/book.model.js";

const rentBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    const book = await BookModel.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ message: "Book not available for rent" });
    }

    const existingRental = await RentalModel.findOne({ userId });
    if (existingRental) {
      return res
        .status(400)
        .json({ message: "You have already rented a book" });
    }

    const rental = new RentalModel({ userId, bookId });
    await rental.save();

    book.available = false;
    await book.save();

    res.status(201).json({ message: "Book rented successfully", rental });
  } catch (err) {
    res.status(500).json({ message: "Error renting book", error: err.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const userId = req.user.id;

    const rental = await RentalModel.findOne({ userId });
    if (!rental) {
      return res.status(400).json({ message: "No rental found for this user" });
    }

    const book = await BookModel.findById(rental.bookId);
    book.available = true;
    await book.save();

    await RentalModel.deleteOne({ _id: rental._id });

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error returning book", error: err.message });
  }
};
export { rentBook, returnBook };
