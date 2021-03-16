module.exports = {
    ensureAuth: function(req, res, next) {
        console.log("in checkAuth === ", req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: function(req, res, next) {
        console.log("Here ==== ", req.isAuthenticated());
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/dashboard');
        }
    },
}