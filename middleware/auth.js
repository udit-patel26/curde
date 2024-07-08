const jwt = require("jsonwebtoken");
const User = require("../model/user.model");


const auth = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    console.log(token,"🚯")

    if (!token) {
      return res.status(500).json({ message: "Please login in auth" });
    }
    console.log("i am after token")

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
      if (err) return res.status(500).json({ message: "Unauthorized user auth" });

      console.log("hello i  am here")
      console.log(user)

      const loggedInUser = await User.findById(user.id);

      if (!loggedInUser) {
        return res.status(500).json({ message: "please login first auth" });
      }
      console.log(loggedInUser,"🫥")

      req.user = loggedInUser;
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports=auth;
