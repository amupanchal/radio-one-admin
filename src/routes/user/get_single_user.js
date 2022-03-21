const express = require("express");
const { user_model } = require("../../model/user");
const getSingleUserRoute = express.Router();

getSingleUserRoute.get('/get/:id', async (req, res) => {
    try {
        let _id = req.params.id
        let response = await user_model.findOne({ _id })
        if (response) {
            res.send({ data: response });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = getSingleUserRoute;