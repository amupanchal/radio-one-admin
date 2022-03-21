const express = require("express");
const { user_model } = require("../../model/user");
const getUserListRoute = express.Router();

getUserListRoute.post('/list', async (req, res) => {
    try {
        let response = await user_model.find({})
        if (response) {
            res.send({ data: response });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = getUserListRoute;