const express = require("express");
const { user_model } = require("../../model/user");
const addUserRoute = express.Router();

addUserRoute.post('/add', async (req, res) => {
    try {
        let body = req.body
        let newUser = new user_model(body);
        let response = await newUser.save();
        if (response) {
            res.send({ message: `User is added successfully.` });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = addUserRoute;