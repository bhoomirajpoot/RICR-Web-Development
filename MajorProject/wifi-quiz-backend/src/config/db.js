const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the MONGO_URI env variable.
 * Exits the process on failure so the app doesn't start silently broken.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are defaults in Mongoose 7+ but listed for clarity
    });
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
