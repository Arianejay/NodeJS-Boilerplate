import mongoose from "mongoose";

import validator from "validator";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value: string) {
                    return validator.isEmail(value);
                },
                message: "Invalid email format!",
            },
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("User", UserSchema);
export default Users;
