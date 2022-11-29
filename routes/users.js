let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
let mapRouter = require('./map')
let scheduleRouter = require('./schedule')
const User = require('../models/User')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended : true}))
router.use(express.static('public'))
router.use("/:id/map", mapRouter)
router.use("/:id/schedule", scheduleRouter)


router.get('/',(req ,res)=>{
    if(req.user){
        res.redirect(`./${req.user.googleId}`)
    }else{
        res.redirect(`./guest`)
    }
    
})

router.get('/:id', ensureAuth, async (req, res)=>{

    let userImg = ''
    let user = await User.findOne({ email: req.user.email})
    if(user){
        userImg = user.image
    }
    res.render('user',{
        msg:"user",
        userName: req.user.firstName + ' ' + req.user.lastName,
        url: req.url,
        userId: req.user.googleId ,
        userImg: userImg,
        key: api_key
    })
})

module.exports = router