const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authentication = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = await User.findById(decoded.id).select("-password -__v");
            req.token = token;
            req.tokenExpiry = decoded.exp;
            return next();
        }

        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = authentication;