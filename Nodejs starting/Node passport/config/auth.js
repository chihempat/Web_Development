module.exports = {
    ensureAuthenticated: function(res, req, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', ' please log in to view the resource');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard');
    }
}