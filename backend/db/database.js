const mongoose = require('mongoose');

const connectDatabase = () => {
    // Create connection with the database
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Connected to Database");
        })
        .catch((error) => {
            console.error("Error connecting to database:", error.message);
        });
};

module.exports = connectDatabase;
