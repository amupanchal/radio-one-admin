const express = require("express");
const { check_employee_authorization } = require("../../middleware/permission");
const { employee_model } = require("../../model/employee");
const getListEmpRoute = express.Router();

getListEmpRoute.post('/list', async (req, res) => {
    try {
        await check_employee_authorization(req.user)
        let filter = { $and: [{ is_active: true }, { is_deleted: false }] }
        let response = await employee_model.find(filter)
        if (response) {
            res.send({ data: response });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = getListEmpRoute;