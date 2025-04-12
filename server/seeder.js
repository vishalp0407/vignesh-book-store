import dotenv from "dotenv";

import connectDB from "./config/db.config.js";
import users from "./data/users.js";
import UserModel from "./models/user.models.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await UserModel.deleteMany();

    await UserModel.insertMany(users);
    console.log(`data imported`);
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserModel.deleteMany();
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
