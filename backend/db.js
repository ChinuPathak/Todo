const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/todo'

async function connectDB() {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

module.exports = connectDB