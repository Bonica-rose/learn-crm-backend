const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = await User.findById(decoded.id).select("-password -__v");
        req.token = token;
        req.tokenExpiry = decoded.exp;
        return next();        

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = authentication;