const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


const promisePool = pool.promise();

//тест подключения
promisePool.getConnection()
  .then(conn => {
    console.log('Успешное подключение к MySQL');
    conn.release();
  })
  .catch(err => {
    console.error('Ошибка подключения к MySQL:', err.message);
  });

module.exports = promisePool;

