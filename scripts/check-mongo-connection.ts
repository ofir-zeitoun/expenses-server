const dotenv = require('dotenv');
import mongoose from 'mongoose';

dotenv.config();

const mongoDBUri = process.env.DBUri;

if (!mongoDBUri) {
  console.error('DBUri is not defined in the environment variables');
  process.exit(1); 
}

console.log('Trying to connect to MongoDB...');

mongoose.connect(mongoDBUri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    process.exit(0); // Successfully exit after a successful connection
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit with an error code
  });
