const jwt = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
            jwt.verify(token, "secretKey", (err, decoded) => {
                if (err) {
                    res.json({ error: true, message: "UnAuthorized User" })
                } else {
                    req.user = decoded;
                    next();
                }
            })
        } else {
            res.json({ error: true, message: "Token Not Found" });
        }
    }
}