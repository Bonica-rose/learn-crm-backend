const mongoose = require("mongoose");

const allowedStatus = ["Customer", "Lead", "Inactive"];
const customerValidator = (req, res, next) => {

    const errors = [];
    const { name, email, phone, company, address, status, notes, createdBy } = req.body;

    if (!name || name.trim() === "") {
        errors.push({
            field: "name",
            message: "Customer name is required"
        });
    } else {
        const nameRegex = /^[a-zA-Z0-9 ]{3,30}$/;        
        if (!nameRegex.test(name)) {
            errors.push({
                field: "name",
                message: "Customer name must be 3-30 characters and contain only letters and space."
            });
        }
    }

    if (!email || email.trim() === "") {
        errors.push({
            field: "email",
            message: "Email is required"
        });
    } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            errors.push({
                field: "email",
                message: "Invalid email format"
            });
        }
    }

    // Phone
    if (!phone || phone.trim() === "") {
        errors.push({
            field: "phone",
            message: "Phone is required"
        });
    } else {
        const phoneRegex = /^[6-9]\d{9}$/;   
        if (!phoneRegex.test(phone)) {
            errors.push({
                field: "phone",
                message: "Invalid phone number."
            });
        }
    }

    // Company
    if (!company || company.trim() === "") {
        errors.push({
            field: "company",
            message: "Company is required"
        });
    }

    // Address
    if (!address || typeof address !== "string" || address.trim() === "") {
        errors.push({
            field: "address",
            message: "Address is required."
        });
    }

    // Status
    if (status && !allowedStatus.includes(status.trim())) {
        errors.push({
            field: "status",
            message: `Status must be one of: ${allowedStatus.join(", ")}.`
        });
    }

    // Notes (optional)
    if (notes && notes.trim() !== "") {
        if (notes.trim().length > 255) {
            errors.push({
                field: "notes",
                message: "Notes cannot exceed 255 characters."
            });
        }
    }

    // Created By
    if (!createdBy || createdBy.trim() === "") {
        errors.push({
            field: "createdBy",
            message: "Creator user ID is required."
        });
    } else if (!mongoose.Types.ObjectId.isValid(createdBy.trim())) {
        errors.push({
            field: "createdBy",
            message: "Invalid creator user ID format."
        });
    }

    req.validationErrors = errors;
    next();
}

module.exports = customerValidator;