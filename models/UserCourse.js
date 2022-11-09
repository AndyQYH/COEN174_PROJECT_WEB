const mongoose = require('mongoose')

const UserCourseSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    courseName:{
        type:String,
        required: true,
    },
    courseType:{
        type:String,
        required: true,
    },
    day:{
        type:String,
    },
    time:{
        type:String,
        required: true,
    },
    location:{
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('UserCourse', UserCourseSchema)