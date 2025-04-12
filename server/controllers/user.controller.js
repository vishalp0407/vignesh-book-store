import jwt from "jsonwebtoken";
import UserModel from "../models/user.models.js";
import generateToken from "../utils/generate-token.util.js";
import bcrypt from "bcryptjs";

/**
 * @desc loginUser
 * @route POST/api/v1/users/login
 * @access public
 */

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.json({ message: "something went wrong" });
  }
};

/**
 * @desc Register users
 * @route POST/api/v1/users
 * @access public
 */

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      res.status(400); // Bad Request (client Error)
      throw new Error("User already exists");
    }

    const user = await UserModel.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Data");
    }
  } catch (error) {
    res.json("something went wrong");
  }
};

export { loginUser, registerUser };
