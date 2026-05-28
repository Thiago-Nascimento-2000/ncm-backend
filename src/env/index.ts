import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  NETBIRD_TOKEN: process.env.NETBIRD_TOKEN,
};

export default ENV;
