const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(process.env.JWT_KEY + " s");
        // console.log(token + " s");
        // console.log(process.env.JWT_KEY + " ");
        let decoded = jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            // console.log(err);
            // console.log(decoded);
        });
        // console.log(decoded);
        req.userData = decoded;
        // console.log(req.userData);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}