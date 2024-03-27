const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'authentication',
    waitForConnections: true,
    connectionLimit: 10, // The limit based on needs
    queueLimit: 0
});

// Create a promise wrapper for the pool
const promisePool = pool.promise();

// Ensure proper connection to the database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting connection: ', err);
        return;
    }
console.log('Connection acquired');

// Releasing the connection
connection.release();

});

module.exports = promisePool;