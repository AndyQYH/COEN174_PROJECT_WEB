let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const User = require('../models/User')
const { ensureAuth, ensureGuest, checkUser} = require('../middleware/auth')
dotenv.config()

const webpage = process.env.WEBPAGE
const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.urlencoded({extended : true}))
router.use(bodyParser.json())
router.use(express.static('public'))
//router.all('*', checkUser)

router.get('/',async (req ,res)=>{
    
    let user

    console.log("url " + req.originalUrl)

    if(!req.user){
        user = await User.findOne({googleId:'guest'})
    }else{
        user = req.user
    }
    console.log(user.displayName)

    res.render('index',{
        msg:'index',
        url:req.originalUrl,
        key:api_key,
        user: user
    })
    
})


module.exports = router
