const express = require("express");
const cors = require('cors')
const { default: mongoose } = require("mongoose");
const user = require("./routes/user.routes");
const category=require('./routes/category.routes');
const product = require("./routes/product.routes");
require("dotenv").config();
const cookie=require('cookie-parser');



const app = express();
app.use(cors({
  origin:"*"
}))
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(cookie())


app.use('/api',user)
app.use('/api',category)
app.use('/api',product)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running...${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
