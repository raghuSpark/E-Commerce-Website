exports.get404 = (req, res, next) => {
    res.status(404)
        .render('404.ejs',
            {
                pageTitle: '404::Error',
                path: '/error',
                isAuthenticated: req.session.isLoggedIn
            });
};