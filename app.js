// const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

// Imports for SQL DB
/***
// const db = require('./util/database');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
***/

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('select * from products')
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err)
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err));

    User.findById("614ebfafe81bc69ba182d880")
        .then(user => {
            // req.user = new User(user.name, user.email, user.cart, user._id);
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use('/add-product', (req, res, next) => {
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">ADD PRODUCT</button></form>');
// });

// app.use('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// });

// app.use('/', (req, res, next) => {
//     res.send('<h1>Hello from EXPRESS!</h1>');
// });

// app.use((req, res, next) => {
//     // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

//     res.status(404).render('404', { pageTitle: '404::Error', path: '/error'});
// });
app.use(errorController.get404);


// code for using SQL DB

/***
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
        // app.listen(3000);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Raghu', email: 'raghu@test.com' });
        }
        // return Promise.resolve(user);
        // or
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

// const server = http.createServer(app);
// server.listen(3000);
// or

// app.listen(3000);

***/

// mongoConnect(() => {
//     app.listen(3000);
// });

mongoose.connect(
    'mongodb+srv://musk:hsU4eaigFKYsp4nA@e-commerce.hqz2z.mongodb.net/shop?retryWrites=true&w=majority'
)
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Raghu',
                        email: 'raghu@test.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });