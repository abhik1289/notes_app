const jwt = require("jsonwebtoken");
require('dotenv').config();
const SEGRET_KEY = process.env.SEGRET_KEY;


const auth = (req, res, next) => {
    const token = req.cookies.jwtoken;
    try {
        if (!token) {
            res.status(401).json({ message: "Token not get" });
        }
        var decoded = jwt.verify(token, SEGRET_KEY);
       
req.user = decoded;
next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;