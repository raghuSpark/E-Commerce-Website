// // const products = [];
// // const fs = require('fs');
// // const path = require('path');

// const db = require('../util/database');

// const Cart = require('./cart');

// /***
// const p = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'products.json'
// );

// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         } else {
//             cb(JSON.parse(fileContent));
//         }
//     });;
// }
// // ***/

// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//     /****
//         save() {
//             // products.push(this);
//             getProductsFromFile(products => {
//                 if (this.id) {
//                     const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//                     const updatedProducts = [...products];
//                     updatedProducts[existingProductIndex] = this;
//                     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//                         console.log('from save() function: ' + err);
//                     });
//                 } else {
//                     this.id = Math.random().toString();
//                     products.push(this)
//                     fs.writeFile(p, JSON.stringify(products), (err) => {
//                         console.log('from save() function: ' + err);
//                     });
//                 }
//             });
//             // fs.readFile(p, (err, fileContent) => {
//             //     let products = [];
//             //     // if (!err) {
//             //     //     console.log(fileContent);
//             //     //     products = JSON.parse(fileContent);
//             //     // }
//             //     // products.push(this)
//             //     // fs.writeFile(p, JSON.stringify(products), (err) => {
//             //     //     console.log(err);
//             //     // });
//             // });
//         }

//         static deleteById(id) {
//             getProductsFromFile(products => {
//                 const product = products.find(prod => prod.id === id);
//                 const updatedProducts = products.filter(prod => prod.id !== id);
//                 fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//                     if (!err) {
//                         Cart.deleteProduct(id, product.price);
//                     }
//                 })
//             });
//         }

//         static fetchAll(cb) {
//             // fs.readFile(p, (err, fileContent) => {
//             //     if (err) {
//             //         cb([]);
//             //     }
//             //     cb(JSON.parse(fileContent));
//             // });
//             getProductsFromFile(cb);
//         }

//         static findById(id, cb) {
//             getProductsFromFile(products => {
//                 const product = products.find(prod => prod.id === id);
//                 cb(product);
//             });
//         }
//     ****/

//     save() {
//         return db.execute(
//             'INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)',
//             [this.title, this.price, this.imageUrl, this.description]
//         );
//     }

//     static deleteById(id) {

//     }

//     static fetchAll() {
//         return db.execute('SELECT * FROM products');
//     }

//     static findById(id) {
//         console.log(id);
//         return db.execute(
//             'SELECT * FROM products WHERE products.id = ?', [id]
//         );
//     }
// };


// sequelize

// const Sequlize = require('sequelize');

// const sequlize = require('../util/database');

// const Product = sequlize.define('product', {
//     id: {
//         type: Sequlize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: {
//         type: Sequlize.STRING,
//         allowNull: false
//     },
//     price: {
//         type: Sequlize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequlize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequlize.STRING,
//         allowNull: false
//     }
// });

// const mongoDb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//     constructor(title, price, description, imageUrl, id, userID) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongoDb.ObjectId(id) : null;
//         this.userID = userID;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         console.log(this._id);
//         if (this._id) {
//             // update the product
//             dbOp = db.collection('products')
//                 .updateOne(
//                     { _id: this._id },
//                     { $set: this });
//         } else {
//             dbOp = db.collection('products')
//                 .insertOne(this);
//         }
//         return dbOp
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => console.log(err));
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products')
//             .find().toArray()
//             .then(products => {
//                 return products;
//             })
//             .catch(err => console.log(err));
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('products')
//             .find({ _id: new mongoDb.ObjectId(prodId) })
//             .next()
//             .then(product => {
//                 return product;
//             })
//             .catch(err => console.log(err));
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products')
//             .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
//             .then(result => {
//                 console.log('Deleted!');
//             })
//             .catch(err => console.log(err));
//     }
// };

// module.exports = Product;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);