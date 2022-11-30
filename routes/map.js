let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../models/User')
const UserCourse = require('../models/UserCourse')
const buildingLLs = require('../public/javascripts/scu_buildings')
const stringSimilarity = require('string-similarity')

dotenv.config()
const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router({mergeParams: true})
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/', ensureAuth, async (req ,res)=>{
    
    console.log("url" + req.url)
    let userCourse
    let user = await User.findOne({ googleId: req.params.user})
    console.log(Object.keys(buildingLLs))

    if(user){
        userCourse = await UserCourse.find({email: user.email})
    }
    let buildings = {}
    if (userCourse) {
        console.log(userCourse)
        for(const course of userCourse){
            console.log(course)
            let match = stringSimilarity.findBestMatch(course.location,Object.keys(buildingLLs))
            console.log(match)
            buildings[match.bestMatch.target] = buildingLLs[match.bestMatch.target]
        }
    }

    console.log("buildings:",buildings)

    res.render('map',{
        msg:"user",
        url: req.originalUrl,
        user:user,
        key: api_key,
        userCourse: userCourse,
        buildings:buildings
    })
})


module.exports = router