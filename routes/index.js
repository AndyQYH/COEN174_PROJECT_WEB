let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const User = require('../models/User')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

dotenv.config()

const webpage = process.env.WEBPAGE
const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.urlencoded({extended : true}))
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/', ensureGuest,(req ,res)=>{
    
    let id, userImg
    if(req.user){
        id = req.user.googleId
        userImg = req.user.image
    }else{
        id = 'Guest'
        userImg = ""
    }

    res.render('index',{
        msg:'index',
        userinfo:'',
        key:api_key,
        userName: '',
        userCourse:[],
        userId: id,
        userImg: userImg
    })
    
})


module.exports = router
