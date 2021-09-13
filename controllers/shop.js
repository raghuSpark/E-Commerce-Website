// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');
const router = require('../routes/admin');

// exports.getAddProduct = (req, res, next) => {
//     res.render('admin/add-product', {
//         pageTitle: 'Add Product',
//         path: '/admin/add-product',
//         formsCSS: true,
//         productCSS: true,
//         activeAddProduct: true
//     });
// };

// exports.postAddProduct = (req, res, next) => {
//     // products.push({ title: req.body.title });
//     const product = new Product(req.body.title);
//     product.save();
//     res.redirect('/');
// };

exports.getProducts = (req, res, next) => {
    /****
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
    ****/
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    }).catch(err => console.log(err));
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render('shop/product-list', {
    //             prods: rows,
    //             pageTitle: 'All Products',
    //             path: '/products',
    //             hasProducts: rows.length > 0,
    //             activeShop: true,
    //             productCSS: true
    //         });
    //     })
    //     .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    /****
    Product.findById(prodId, product => {
        // console.log(product);
        res.render('shop/product-detail', {
            pageTitle: product.title,
            product: product,
            path: '/products'
        });
    });
    ****/
    /*
     Product.findAll({ where: { id: prodId } })
         .then(products => {
             res.render('shop/product-detail', {
                 product: products[0],
                 pageTitle: products[0].title,
                 path: '/products'
             });
         })
         .catch(err => console.log(err));
         */
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));

    // Product.findById(prodId)
    //     .then(([product]) => {
    //         res.render('shop/product-detail', {
    //             product: product[0],
    //             pageTitle: product[0].title,
    //             path: '/products'
    //         });
    //     })
    //     .catch(err => console.log('err:' + err));
};

exports.getIndex = (req, res, next) => {
    /****
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
    ****/
    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch(err => console.log(err));
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render('shop/index', {
    //             prods: rows,
    //             pageTitle: 'Shop',
    //             path: '/',
    //         });
    //     })
    //     .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            // console.log(cart);
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products
                    });
                })
                .catch(err => console.log(errr));
        })
        .catch(err => console.log(err));
};
/****
exports.getCart = (req, res, next) => {
Cart.getCart(cart => {
    Product.fetchAll(products => {
        const cartProducts = [];
        for (product of products) {
            const cartProductsData = cart.products.find(prod => prod.id === product.id);
            if (cartProductsData) {
                cartProducts.push({ productData: product, qty: cartProductsData.qty });
            }
        }
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
        });
    });
});
};
****/

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                // return fetchedCart.addProduct(product, {
                //     through: {quantity: newQuantity}
                // });
                return product;
            }
            return Product.findByPk(prodId);
            // .then(product => {
            //     return fetchedCart.addProduct(product, {
            //         through: { quantity: newQuantity }
            //     });
            // })
            // .catch(err => console.log(err));
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    /**
    // console.log('postCart:' + prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/products');
    **/
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    Product.findByPk(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};