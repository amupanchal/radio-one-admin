const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: { type: String },
        role: { type: String },
        password: { type: String },
        is_active: { type: Boolean, default: true },
        is_deleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

exports.user_model = mongoose.model("user", userSchema);
