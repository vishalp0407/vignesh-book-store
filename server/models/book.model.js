import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "book title is required"],
      trim: true,
    },
    author: String,
    genre: String,
    description: String,
    coverImage: {
      type: String,
    }, // Will store image file name
    isRented: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("BookModel", bookSchema);

export default BookModel;
