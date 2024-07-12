require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_DB_URL = process.env.MONGO_DB_URL;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB_URL);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
