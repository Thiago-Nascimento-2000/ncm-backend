import dotenv from "dotenv";

dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE
}

export default ENV;