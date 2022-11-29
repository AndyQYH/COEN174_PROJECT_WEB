const mongoose = require('mongoose')

const BuildingInfomationSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    latitude:{
        type:String,
        required: true,
    },
    longitude:{
        type:String,
        required: true,
    },
})

module.exports = mongoose.model('BuildingInfomation', BuildingInfomationSchema)