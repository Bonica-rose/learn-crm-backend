const Customer = require("../models/customer.model");

const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create({
            ...req.body,
            createdBy: req.user._id
        }).select("-__v -updatedAt");

        res.status(201).json({
            success: true,
            customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer
            .find({ createdBy: req.user._id })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 })
            .select("-__v -createdAt -updatedAt");

        res.status(200).json({
            success: true,
            count: customers.length,
            customerDataList: customers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer
            .findOne({
                _id: req.params.id,
                createdBy: req.user._id
            })
            .populate("createdBy", "name email")
            .select("-__v -createdAt -updatedAt");

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("createdBy", "name email").select("-__v -createdAt");

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
};