const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const AuthRouter = require("./Routes/AuthRouter");
const CartRouter = require("./Routes/CartRouter")
const OrderRouter = require("./Routes/OrderRouter");

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/cart',CartRouter);
app.use('/orders',OrderRouter);


app.listen(PORT, () => {
  console.log(`app is listening to ${PORT}`);
});
