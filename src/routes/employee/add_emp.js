const express = require("express");
const { check_employee_authorization } = require("../../middleware/permission");
const { employee_model } = require("../../model/employee");
const addEmpRoute = express.Router();
const nodeMailer = require('nodemailer')


addEmpRoute.post('/create', async (req, res) => {
    try {
        await check_employee_authorization(req.user)
        let body = req.body
        let findEmail = await employee_model.find({}).lean()
        let getEmail = findEmail.map((value) => { return value.email })
        let newEmp = new employee_model(body);
        let response = await newEmp.save();
        if (response) {
            await sendMail(response, getEmail)
            res.send({ message: `Employee is added successfully.` });
        } else {
            throw { code: 503, message: "Something Went Wrong" }
        }
    } catch (error) {
        res.send(error);
    }
})

const sendMail = (emp, emailAddress) => {
    const tranfer = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'amupanchal6058@gmail.com',
            pass: 'Iks@gebbs'
        }
    })

    const mailOption = {
        from: 'amupanchal6058@gmail.com',
        to: emailAddress,
        subject: 'New Employee Joined',
        text: `${emp.firstName} joined our orginzation to the ${emp.department}`
    }
    tranfer.sendMail(mailOption, (error, info) => {
        if (error) {
            return true
        } else {
            return { message: `Employee is added.` };
        }
    })
}

module.exports = addEmpRoute;