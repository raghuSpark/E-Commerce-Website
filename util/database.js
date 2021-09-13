/****
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Q!w2E#r4T%y6'
});
module.exports = pool.promise();
****/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Q!w2E#r4T%y6',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;