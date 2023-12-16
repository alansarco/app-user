const mysql = require('mysql2');
const mysql2 = require('mysql2/promise');

// create the damn connection
const dbConnection = mysql.createPool({
    host: process.env.DB_HOST || process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME || process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const dbConnection2 = mysql2.createPool({
    host: process.env.DB_HOST || process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME || process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
    dbConnection,
    dbConnection2
};
