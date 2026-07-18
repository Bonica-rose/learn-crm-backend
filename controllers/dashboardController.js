const User = require("../models/user.model");
const Customer = require("../models/customer.model");

const getDashboard = async (req, res) => {
    try {
        let dashboardData;

        switch (req.user.role) {
        case "Admin":
            dashboardData = await adminStats();
            break;

        case "Staff":
            dashboardData = await staffStats(req.user._id);
            break;

        default:
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            dashboardData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const adminStats = async () => {
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

    return {
        totalUsers,
        totalCustomers,
        totalLeads,
        inactiveCustomers,
    };
};

const staffStats = async (staffId) => {
    const myCustomers = await Customer.countDocuments({
        createdBy: staffId,
    });

    const myLeads = await Customer.countDocuments({
        createdBy: staffId,
        status: "Lead",
    });

    const myInactiveCustomers = await Customer.countDocuments({
        createdBy: staffId,
        status: "Inactive",
    });

    return {
        myCustomers,
        myLeads,
        myInactiveCustomers
    };
};

module.exports = {
    getDashboard,
};