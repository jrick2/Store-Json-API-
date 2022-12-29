const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const router = require("./routes/products");
require("dotenv").config();
require("express-async-errors");

// asyc errors

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store APi</h1><a href="/api/v1/products">Product route</a>');
});

app.use("/api/v1/products", router);

// product route

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.DATABASE_URI);
    app.listen(port, console.log(`Server is lisining on port${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
