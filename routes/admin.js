const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router();

// const products = [];

// /admin/add-product => GET
// router.get('/add-product', (req, res, next) => {
//     // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">ADD PRODUCT</button></form>');
//     // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
//     // or
//     // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
//     res.render('add-product', {
//         pageTitle: 'Add Product',
//         path: '/admin/add-product',
//         formsCSS: true,
//         productCSS: true,
//         activeAddProduct: true
//     });
// });
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// /admin/add-product => POST
// router.post('/add-product', (req, res, next) => {
//     // console.log(req.body);
//     products.push({ title: req.body.title });
//     res.redirect('/');
// });
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;