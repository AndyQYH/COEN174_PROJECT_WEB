let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../models/User')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router({mergeParams: true})
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/', ensureAuth, async (req ,res)=>{
    let user 
    console.log("url" + req.url)
    if(req.user){
        user = req.user
    }else{
        user = await User.findOne({googleId: req.params.user})
    }

    res.render('map',{
        msg:"user",
        url: req.originalUrl,
        user:user,
        key: api_key,
        
    })
})


module.exports = router