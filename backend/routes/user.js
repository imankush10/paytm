require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const { User } = require("../db");
const { Account } = require("../db");

const authMiddleware = require("../middleware");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    const result = signupBody.safeParse(body);
    if (!result.success)
      return res
        .status(400)
        .json({ message: "Invalid types", error: result.error });

    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const dbUser = await User.create(body);

    await Account.create({
      balance: Number(Math.random() * 10000 + 1).toFixed(4),
      userId: dbUser._id,
    });

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(411).send(err.message);
  }
});

const signinBody = z.object({
  identifier: z.string().min(3).max(30),
  password: z.string().min(6),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  try {
    const result = signinBody.safeParse(body);

    if (!result.success)
      res.status(400).json({ message: "Invalid types", error: result.error });

    const user = await User.findOne({
      $or: [{ username: body.identifier }, { email: body.identifier }],
      password: body.password,
    });

    if (!user) {
      return res.status(411).json({
        message: "Error while logging in",
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return res.status(200).json({
      token,
      name: user.name,
    });
  } catch (err) {
    return res.status(411).send(err.message);
  }
});

const updateBody = z.object({
  name: z.string().max(50).optional(),
  username: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateBody.safeParse(body);
  if (!success)
    return res.status(403).json({
      message: "Error while updating",
    });

  await User.updateOne({ _id: req.userId }, body);
  return res.json({ message: "Update successfully" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filterString = req.query.filter?.toLowerCase() || "";
  const x = await User.find({
    $or: [
      { name: { $regex: `.*${filterString}.*`, $options: "i" } },
      { username: { $regex: `.*${filterString}.*`, $options: "i" } },
      { email: { $regex: `.*${filterString}.*`, $options: "i" } },
    ],
  }).limit(5);
  return res.json(x);
});

module.exports = router;
