const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        //closing the process
        process.exit(1)
    }
}

module.exports = connectDB;