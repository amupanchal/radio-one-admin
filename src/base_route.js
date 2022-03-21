const express = require("express");
const { verify_token } = require("./middleware/jwt_auth");
const addEmpRoute = require("./routes/employee/add_emp");
const deleteEmpRoute = require("./routes/employee/delete_emp");
const getListEmpRoute = require("./routes/employee/get_list_emp");
const getSingleEmpRoute = require("./routes/employee/get_single_emp");
const updateEmpRoute = require("./routes/employee/update_emp");
const addUserRoute = require("./routes/user/add_user");
const deleteUserRoute = require("./routes/user/delete_user");
const getUserListRoute = require("./routes/user/get_list_user");
const getSingleUserRoute = require("./routes/user/get_single_user");
const signinRoute = require("./routes/user/signin_route");
const updateUserRoute = require("./routes/user/update_user");
const baseRouter = express.Router();

baseRouter.use(async (req, res, next) => {
    try {
        let headers = req.headers;
        if (headers.authorization) {
            req.user = await verify_token(headers.authorization);
        }
        next();
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)
        }
    }
});

// User Routes
baseRouter.use('/user', signinRoute)
baseRouter.use('/user', addUserRoute)
baseRouter.use('/user', deleteUserRoute)
baseRouter.use('/user', getUserListRoute)
baseRouter.use('/user', getSingleUserRoute)
baseRouter.use('/user', updateUserRoute)

//Employee Routes
baseRouter.use('/emp', addEmpRoute)
baseRouter.use('/emp', getListEmpRoute)
baseRouter.use('/emp', getSingleEmpRoute)
baseRouter.use('/emp', deleteEmpRoute)
baseRouter.use('/emp', updateEmpRoute)

module.exports = baseRouter;


// heroku url 
// https://radio-one-admin.herokuapp.com/