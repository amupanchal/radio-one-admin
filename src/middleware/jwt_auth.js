const jwt = require('jsonwebtoken');
const { user_model } = require('../model/user');
let secretKey = 'pocSecrete'

exports.generate_token = async (userInfo) => {
    try {
        let token = jwt.sign(userInfo, secretKey, { expiresIn: "1h" });
        return token
    } catch (error) {
        throw error
    }
}

exports.verify_token = async (token) => {
    try {
        if (token) {
            if (token.includes('Bearer')) { throw { code: 401, message: 'Invalid Token' } }
            let decode_token = jwt.verify(token, secretKey);
            if (decode_token) {
                let get_user = await user_model.findById(decode_token._id).lean()
                return { _id: get_user._id, email: get_user.email,role: get_user.role }
            } else {
                throw { code: 401, message: 'Token Expired' }
            }
        } else {
            throw { code: 503, message: 'Please Provide a authorization token' }
        }

    } catch (error) {

        throw error
    }
}