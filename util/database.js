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


// NOT NEEDED WHEN USING MONGOOSE
/****

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://raghu:kkksYdteATASA3zO@e-commerce.plaoz.mongodb.net/shop?retryWrites=true&w=majority')
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

****/