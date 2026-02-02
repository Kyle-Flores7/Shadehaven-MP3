require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { seedDatabaseIfEmpty } = require('./services/externalApiService');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await seedDatabaseIfEmpty();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
