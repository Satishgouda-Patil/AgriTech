module.exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('err', 'You must login first.');
        return res.redirect('/auth/login');
    }
    else{
        return next();
    }
};