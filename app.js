const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;

const morgan = require("morgan");

const mongoose = require("mongoose");

//Routes
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const ordersRoutes = require("./routes/order");
const usersRoutes = require("./routes/user");

//Middleware
app.use(express.json());
app.use(morgan("tiny"));

//Router
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Create server to listem on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
