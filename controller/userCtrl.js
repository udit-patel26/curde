const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      console.log(email, name, password);

      const user = await User.findOne({ email: email });

      // User Exist
      if (user) {
        return res.status(403).json({ message: "User Already Exist" });
      }

      //Password length must be greater than 6
      if (password.length < 6) {
        return res
          .status(500)
          .json({ message: "Password Length must be greate than 6" });
      }

      //Create password using bcrypt

      const passwordHash = await bcrypt.hash(password, 10);

      //Create User
      const newUser = new User({
        name,
        password: passwordHash,
        email,
      });

      await newUser.save();

      const token = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      return res
        .status(201)
        .json({ newUser,message: "User Registered Successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  refreshToken: async (req, res) => {

    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return res.status(400).json({ message: "Please login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN, async(err, user) => {
        if (err) return res.status(500).json({ message: err.message });

        console.log(user,"find find");
        const user3 = await User.findById(user.id);
        console.log(user3,"user3");

        const accessToken = createAccessToken({ id: user.id });
        

        res.status(200).json({ accessToken });
      });
    } catch (err) {
      res.status(400).json({ message: err.message, don: "done" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!email){
        return res.status(500).json({message:"Plaese enter email"})
      }
      if(!password){
        return res.status(500).json({message:"Please enter password"})
      }
      console.log(email, password,"done i m here");

      const user = await User.findOne({ email: email });

      console.log(user)
      if (!user) {
        res.json({ message: "User not found login 🦹" });
        return
      }
      console.log(user,"after i am here")
      console.log(password,user.password+"😊😊😊😊😊")

      const isMatch =await bcrypt.compare(password, user.password);
      

      if (!isMatch) {
         res.status(400).json({ message: "Password is not matching login⚔️" });
         return
       
        
      }
      console.log("password after")

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      console.log(accessToken,"😆")
      console.log(refreshToken,"😆")

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.status(200).json({ accessToken });
      console.log("access token")
    } catch (err) {
      res.status(5000).json({ message: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ message: "Log Out" });
    } catch (err) {
      res.json({ message: "Not logged out" });
    }
  },
  getUser: async (req, res) => {
    try {
        console.log(req.user)
      const user = await User.findById(req.user.id).select("-password"); 

      if (!user) {
        res.status(500).json({ message: "user not found in getUser" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};

module.exports = userCtrl;
