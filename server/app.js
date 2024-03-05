require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cors = require("cors");
const router = require("./routes/router");


const port = 8003;

app.use(cors());
app.use(express.json());
app.use(router);



app.listen(port, () => {
  console.log(`Server is starting on port number ${port}`);
});