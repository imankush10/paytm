const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const { balance } = await Account.findOne({ userId: req.userId });
  return res.status(200).json({
    balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession(); // session start

  session.startTransaction(); // transaction start

  const { to, amount } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(403).json({
      message: "Insufficient funds",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(403).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction(); // transaction commit

  return res.status(200).json({
    message: "Transfer successful",
    remainingBalance: account.balance,
  });
});

module.exports = router;
