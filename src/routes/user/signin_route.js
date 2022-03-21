const express = require("express");
const { generate_token } = require("../../middleware/jwt_auth");
const { user_model } = require("../../model/user");
const signinRoute = express.Router();


signinRoute.post('/sign-in', async (req, res) => {
    try {
        let body = req.body
        console.log(`body`, body);
        let getUser = await user_model.findOne({ email: body.email })
        if (getUser.role == 'Admin') {
            const token = await generate_token({ _id: getUser._id })
            res.json({ role: getUser.role, token: token })
        } else {
            res.json({ message: `user not validate.` })
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = signinRoute;