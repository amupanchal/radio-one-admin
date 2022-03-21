const express = require("express");
const { check_employee_authorization } = require("../../middleware/permission");
const { employee_model } = require("../../model/employee");
const getSingleEmpRoute = express.Router();

getSingleEmpRoute.get('/get/:id', async (req, res) => {
    try {
        await check_employee_authorization(req.user)
        let _id = req.params.id
        let response = await employee_model.findOne({ _id })
        if (response) {
            res.send({ data: response });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = getSingleEmpRoute;