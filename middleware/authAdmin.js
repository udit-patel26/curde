const User = require("../model/user.model");

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });

    if (user.role === 0)
      return res.status(500).json({ message: "Admin Dashboard Access Denied" });

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = authAdmin;
