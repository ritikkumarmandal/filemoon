import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
  throw new Error('PORT is not defined in the environment variables');
}

if (!process.env.MONGO_URL) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}


const config = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGO_URL,
}
export default config;