
import dotenv from 'dotenv';

dotenv.config();

import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.getConnection()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection error:', err));

export default connection;
