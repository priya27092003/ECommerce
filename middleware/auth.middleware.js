const jwt = require('jsonwebtoken');

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token,process.env.JWT_SECRET ||  "shhhhh", (err, data) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = data;
        next();
    });
}

module.exports = isLoggedIn;
