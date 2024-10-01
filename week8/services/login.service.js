const { Registration} = require('../Models/signupModel');
const {Walker} = require('../Models/signupModelWalker');

exports.findUser = (email, password, type) => {
    if (type === 'OWNER') {
        return Registration.findOne({ "email": email, "password": password });
    } else if (type === 'WALKER') {
        return Walker.findOne({ "email": email, "password": password });
    } 
}
