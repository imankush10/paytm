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
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
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

const accountSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
