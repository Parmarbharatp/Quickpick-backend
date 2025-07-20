const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/signup', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
    // Drop obsolete username index if it exists
    try {
      await mongoose.connection.db.collection('users').dropIndex('username_1');
      console.log('Dropped obsolete username_1 index from users collection.');
    } catch (err) {
      if (err.codeName === 'IndexNotFound') {
        console.log('username_1 index not found, nothing to drop.');
      } else {
        console.error('Error dropping username_1 index:', err.message);
      }
    }
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
