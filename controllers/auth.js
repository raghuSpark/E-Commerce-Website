exports.getLogin = (req, res, next) => {
    console.log(req.cookies);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    res.cookie('loggedIn', 'true').send('cookie set');
    res.redirect('/');
};