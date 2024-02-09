const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req._id = data._id;
        req.user = data.user;
        next();
    } catch (err) {
        next();
    }
}
module.exports = auth;