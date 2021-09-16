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

/***
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Q!w2E#r4T%y6',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;
***/

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://musk:z8Xd3k685awFeLst@cluster0.hqz2z.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;