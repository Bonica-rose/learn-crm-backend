const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: "Registration successful"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in production with HTTPS
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login successful",            
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};

module.exports = {
    register,
    login,
    getMe
};