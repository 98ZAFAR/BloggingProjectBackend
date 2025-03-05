const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");

const {
  sendForgetPasswordURL,
  sendWelcomeEmail,
} = require("../middleware/emailSendMiddleware");
const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const getUser = await User.findOne({email});
    if(getUser) return res.status(400).json({message:"User already exists"});
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!" });
    }

    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET_KEY)
      .update(password)
      .digest("hex");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User created successfully!", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET_KEY)
      .update(password)
      .digest("hex");
    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: "Wrong Password!" });
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: email,
      role: user.role,
      profileImgUrl:user.profileImgUrl,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "User logged in successfully!", token: token, user:payload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};
const handleForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendForgetPasswordURL(user.email,resetURL);
    return res.status(200).json({ message: "Reset password link sent to your email!", data: resetURL });
  } catch (error) {
    console.error("Error in forget password:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ error: "New password is required!" });
    }
    const decoded = jwt.verify(resetToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET_KEY)
      .update(newPassword)
      .digest("hex");
    user.password = hashedPassword;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

module.exports = {
  handleLogin,
  handleSignup,
  handleForgetPassword,
  handleResetPassword
};
