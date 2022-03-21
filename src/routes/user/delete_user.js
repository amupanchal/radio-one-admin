const express = require("express");
const { user_model } = require("../../model/user");
const deleteUserRoute = express.Router();

deleteUserRoute.delete('/delete/:id', async (req, res) => {
    try {
        let _id = req.params.id
        let getUser = await user_model.findById({ _id }).lean()
        if (getUser) {
            getUser.is_active = false,
                getUser.is_deleted = true
            let response = await user_model.findByIdAndUpdate({ _id }, { $set: getUser, new: true })
            if (response) {
                res.send({ message: `User deleted successfully ` });
            } else {
                throw { code: 503, message: "Something Went Wrong" }
            }
        } else {
            res.send({ message: `user not found` });
        }

    } catch (error) {
        res.send(error);
    }
})

module.exports = deleteUserRoute;