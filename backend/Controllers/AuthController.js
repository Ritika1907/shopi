const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already Exist", success: false });
    }
    const newUser = new User({ username, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "email or password is Wrong", success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "email or password is Wrong", success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({
        message: "Login Successfully",
        success: true,
        jwtToken,
        email,
        username: user.username,
        cart:user.cart,
        orders:user.orders
      });
  } catch (err) {
    res.status(500).json({ message: `Internal Server Error ${err}`, success: false });
  }
};

module.exports = { signup, login };
