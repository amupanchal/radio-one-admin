const express = require("express");
const { check_employee_authorization } = require("../../middleware/permission");
const { employee_model } = require("../../model/employee");
const deleteEmpRoute = express.Router();

deleteEmpRoute.delete('/delete/:id', async (req, res) => {
    try {
        await check_employee_authorization(req.user)
        let _id = req.params.id
        let getEmp = await employee_model.findById({ _id }).lean()
        if (getEmp) {
            getEmp.is_active = false,
            getEmp.is_deleted = true
            let response = await employee_model.findByIdAndUpdate({ _id }, { $set: getEmp, new: true })
            if (response) {
                res.send({ message: `Employee is deleted.` });
            } else {
                throw { code: 503, message: "Something Went Wrong" }
            }
        } else {
            res.send({ message: `Employee not found` });
        }

    } catch (error) {
        res.send(error);
    }
})

module.exports = deleteEmpRoute;