const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postAddProduct = (req, res, next) => {
    // products.push({ title: req.body.title });
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // const product = new Product(null, title, imageUrl, description, price);
    // product.save();
    /**
    product
        .save()
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err));
    // res.redirect('/');
    **/

    // req.user
    //     .createProduct({
    //         title: title,
    //         price: price,
    //         imageUrl: imageUrl,
    //         description: description,
    //         // ...
    //         // userId: req.user.id
    //     })
    //     .then(() => {
    //         console.log("Created a product!");
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
    // const product = new Product(title, price, description, imageUrl, null, req.user._id);
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product
        .save()
        .then(() => {
            console.log("Created a product!");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    // req.user
    //     .getProducts({ where: { id: prodId } })
    //     // Product.findByPk(prodId)
    //     .then(products => {
    //         const product = products[0];
    //         if (!product) {
    //             return res.redirect('/');
    //         }
    //         res.render('admin/edit-product', {
    //             pageTitle: 'Edit Product',
    //             path: '/admin/edit-product',
    //             editing: editMode,
    //             product: product
    //         });
    //     })
    //     .catch(err => console.log(err));

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));

    // Product.findById(prodId, product => {
    //     if (!product) {
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product', {
    //         pageTitle: 'Edit Product',
    //         path: '/admin/edit-product',
    //         editing: editMode,
    //         product: product
    //     });
    // });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    // const updatedProduct = new Product(
    //     prodId,
    //     updatedTitle,
    //     updatedImageUrl,
    //     updatedDesc,
    //     updatedPrice
    // );
    // updatedProduct.save();

    // Product.findByPk(prodId)
    //     .then(product => {
    //         product.title = updatedTitle;
    //         product.price = updatedPrice;
    //         product.description = updatedDesc;
    //         product.imageUrl = updatedImageUrl;
    //         return product.save();
    //     })
    //     .then(result => {
    //         console.log('PRODUCT IS UPDATED!')
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
    // res.redirect('/admin/products');

    // const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);
    // product.save()
    //     .then(result => {
    //         console.log('PRODUCT IS UPDATED!')
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            // product.userId = req.user;
            return product.save();
        })
        .then(result => {
            console.log('PRODUCT IS UPDATED!')
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Product.deleteById(prodId);
    // Product.findByPk(prodId)
    //     .then(product => {
    //         return product.destroy();
    //     })
    //     .then(result => {
    //         console.log('PRODUCT DESTROYED!');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
    // res.redirect('/admin/products');

    // Product.deleteById(prodId)
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('PRODUCT DESTROYED!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    // req.user
    //     .getProducts()
    //     // Product.findAll()
    //     .then(products => {
    //         res.render('admin/products', {
    //             prods: products,
    //             pageTitle: 'Admin Products',
    //             path: '/admin/products',
    //         });
    //     })
    //     .catch(err => console.log(err));

    // Product.fetchAll((products) => {
    //     res.render('admin/products', {
    //         prods: products,
    //         pageTitle: 'Admin Products',
    //         path: '/admin/products',
    //     });
    // });

    // Product.fetchAll()
    Product.find()
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};