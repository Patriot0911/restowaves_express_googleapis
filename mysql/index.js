import mysql from 'mysql2/promise';
import { config  as envConfig } from 'dotenv';

envConfig();

const dbInfo = {
    host: 'localhost',
    db: 'products',
    user: process.env.dbUser,
    password: process.env.dbPassword
};

// Створємо pool для наших запитів
const pool = mysql.createPool(dbInfo);

export default pool;
