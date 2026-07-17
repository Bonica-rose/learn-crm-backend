const User = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .sort({ createdAt: -1 })
            .select("-__v -updatedAt");

        res.status(200).json({
            success: true,
            count: users.length,
            userDataList: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
            _id: req.params.id
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getUsers,
    deleteUser
};