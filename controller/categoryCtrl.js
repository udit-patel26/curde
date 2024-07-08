const Category = require("../model/category.model");

const categoryCtrl = {
  getCategory: async (req, res) => {
    try {
      const category = await Category.find({});

      res.json(category);
    } catch (err) {
      res.json({ message: err.message });
    }
    res.json({ message: "Category Created" });
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const existCategory = await Category.findOne({ name });

      if (existCategory) {
        res.json({ message: "Category Already existed" });
      }

      const newCategory = new Category({
        name,
      });

      newCategory.save();

      res.json({ message: "Category Created" });
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      // console.log(id)
      const user = await Category.findById(id);
      // console.log(user)

      const category = await Category.findByIdAndDelete(id);

      if (!category) {
        res.send("user not found in delete category");
      }

      res.json({ message: "Category Deleted" });
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {

        const{id}=req.params
        console.log(id)
      await Category.findByIdAndUpdate(id, req.body);

      res.json({ messaeg: "Category Updated" });
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};

module.exports = categoryCtrl;
