const mongoose = require('mongoose')

const CourseInformationSchema = new mongoose.Schema({
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
        required: true,
    },
    time:{
        type:String,
        required: true,
    },
    location:{
        type:String,
        required: true,
    },
    longitude:{
        type:String,
        required: true,
    },
    latitude:{
        type:String,
        required: true,
    },
})

module.exports = mongoose.model('CourseInformation', CourseInformationSchema)