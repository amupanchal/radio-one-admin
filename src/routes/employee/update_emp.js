const express = require("express");
const { check_employee_authorization } = require("../../middleware/permission");
const { employee_model } = require("../../model/employee");
const updateEmpRoute = express.Router();

updateEmpRoute.put('/update/:id', async (req, res) => {
    try {
        await check_employee_authorization(req.user)
        let _id = req.params.id
        let body = req.body
        let response = await employee_model.findByIdAndUpdate({ _id }, { $set: body, new: true })
        if (response) {
            res.send({ message: `Employee is updated` });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = updateEmpRoute;