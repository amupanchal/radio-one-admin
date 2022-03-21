const express = require("express");
const { user_model } = require("../../model/user");
const updateUserRoute = express.Router();

updateUserRoute.put('/update/:id', async (req, res) => {
    try {
        let _id = req.params.id
        let body = req.body
        let response = await user_model.findByIdAndUpdate({ _id }, { $set: body, new: true })
        if (response) {
            res.send({ message: `User is updated` });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = updateUserRoute;