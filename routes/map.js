let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/', ensureGuest,(req ,res)=>{
    res.render('map',{
        msg:'map',
        userinfo:'',
        key:api_key,
        userCourse:[]
    })
})

router.get("/user",ensureAuth, async(req,res)=>{
    //console.log(req.user)
    let userImg = ''
    let user = await User.findOne({ email: req.user.email})
    if(user){
        userImg = user.image
    }
    

    let userCourse = await UserCourse.find({email: req.user.email})

    if (userCourse) {
        console.log(userCourse)
    }

    res.render('map',{
        msg:"map/user",
        userinfo:req.user.email,
        userImg: userImg,
        key:api_key,
        userCourse:userCourse
    })
})

module.exports = router