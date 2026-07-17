const User = require("../models/user.model");
const Customer = require("../models/customer.model");

const getAdminDashboard = async (req, res) => {
    try {
        const [
            totalUsers,
            totalCustomers,
            totalLeads,
            inactiveCustomers,
        ] = await Promise.all([
            User.countDocuments(),
            Customer.countDocuments(),
            Customer.countDocuments({ status: "Lead" }),
            Customer.countDocuments({ status: "Inactive" }),
        ]);

        res.status(200).json({
            success: true,
            dashboardData: {
                totalUsers,
                totalCustomers,
                totalLeads,
                inactiveCustomers,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAdminDashboard,
};