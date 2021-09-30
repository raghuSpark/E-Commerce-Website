const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.cookies['loggedIn'];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true');

    // res.cookie('loggedIn', true);
    // req.session.isLoggedIn = true;
    // res.redirect('/');

    User.findById("6151d33754a1e119fa491519")
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            // res.redirect('/');
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};