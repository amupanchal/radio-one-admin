exports.check_employee_authorization = async (user) => {
    try {
        if (user && (user.role == 'Admin')) {
            return true
        } else {
            throw { code: 401, message: "user don't have access " }
        }
    } catch (error) {
        throw error;
    }
};
