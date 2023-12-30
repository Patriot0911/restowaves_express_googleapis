import mysql from 'mysql2/promise';
import { config  as envConfig } from 'dotenv';

envConfig();

const dbInfo = {
    host: 'localhost',
    db: 'products',
    user: process.env.dbUser,
    password: process.env.dbPassword
};

const pool = mysql.createPool(dbInfo);

export default pool;
