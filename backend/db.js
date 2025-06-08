const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
   port: process.env.DB_PORT,  
  user: process.env.DB_USER || 'root',
 password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection immediately
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL!');
    connection.release();
  } catch (err) {
    console.error('MySQL connection error:', err.message);
  }
})();

module.exports = db;
