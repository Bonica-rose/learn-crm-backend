const jwt = require("jsonwebtoken");

const generateToken = (usr) => {
    return jwt.sign(
        { id: usr._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
};

module.exports = generateToken;