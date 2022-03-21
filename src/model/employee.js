const mongoose = require("mongoose");

const empSchema = mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        postion: { type: String },
        email: { type: String },
        department: { type: String },
        dob: { type: Date },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

exports.employee_model = mongoose.model("employee", empSchema);