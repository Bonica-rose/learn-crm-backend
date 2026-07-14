const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"]
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true
        },

        company: {
            type: String,
            trim: true,
            default: ""
        },

        address: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: ["Lead", "Customer", "Inactive"],
            default: "Lead"
        },

        notes: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Customer", customerSchema);