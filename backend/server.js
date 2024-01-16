const mongoose = require('mongoose');
const app = require("./app");
const connectDatabase = require('./db/database'); 

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err}`);
  console.log(`😡Shutting down the server.........`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// Connect to the database
connectDatabase();

// Create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port :${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection 💥: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
