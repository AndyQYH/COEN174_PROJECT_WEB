const User = require('../models/User')

const ECampusSchema = {
    id:{
        in:['params','body'],
        errorMessage: "id does not exist or not allowed",
        isString: true,
        toString: true
    },
    username:{
        notEmpty: true,
        matches: {
            options:['/W']
        },
        errorMessage: "username cannot be empty and should start with W"
    },
    password:{
        notEmpty: true,
        errorMessage: "password cannot be empty"
    }
}

module.exports = ECampusSchema