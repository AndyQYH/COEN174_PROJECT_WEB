const User = require('../models/User')

const ECampusSchema = {
    username:{
        notEmpty: true,
        matches: {
            options:['^W']
        },
        errorMessage: "username cannot be empty and should start with W"
    },
    password:{
        notEmpty: true,
        errorMessage: "password cannot be empty"
    }
}

module.exports = ECampusSchema