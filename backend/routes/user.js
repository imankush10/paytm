require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const User = require("../db");
const authMiddleware = require("../middleware");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = z.object({
  name: z.string().max(50),
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    const result = signupBody.safeParse(body);
    if (!result.success)
      res.status(400).json({ message: "Invalid types", error: result.error });

    const user = await User.findOne({ username: body.username });

    if (user) {
      res.status(411).json({
        message: "User already exists",
      });
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
    res.status(200).json({
      message: "User created successfully",
      token,
    });
  } catch (err) {
    if(!res.headersSent) res.status(411).send(err.message);
  }
});

const signinBody = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

router.post("/signin", async (req, res) => {
  
  const body = req.body;
  try {
    const result = signinBody.safeParse(body);

    if (!result.success)
      res.status(400).json({ message: "Invalid types", error: result.error });

    const user = await User.findOne({
      username: body.username,
      password: body.password,
    });

    if (!user) {
      res.status(411).json({
        message: "Error while logging in",
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({
      token,
    });
  } catch (err) {
    if(!res.headersSent) res.status(411).send(err.message);
  }
});

router.get('/working', authMiddleware, (req,res)=>{
  res.json({message:"Sup"});
})

module.exports = router;
