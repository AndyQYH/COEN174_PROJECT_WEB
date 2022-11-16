const User = require('../models/User')

const ECampusSchema = {
    username:{
        notEmpty: true,
        errorMessage: "username cannot be empty"
    },
    password:{
        notEmpty: true,
        errorMessage: "password cannot be empty"
    }
}