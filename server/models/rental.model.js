import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    unique: true,
  },
  rentedAt: {
    type: Date,
    default: Date.now,
  },
});

const RentalModel = mongoose.model("RentalModel", rentalSchema);

export default RentalModel;
