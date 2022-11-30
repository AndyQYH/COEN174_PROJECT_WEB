let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
let mapRouter = require('./map')
let scheduleRouter = require('./schedule')
const User = require('../models/User')
const { ensureAuth, ensureGuest, checkUser} = require('../middleware/auth')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended : true}))
router.use(express.static('public'))
router.use("/:user/map", mapRouter)
router.use("/:user/schedule", scheduleRouter)

router.get('/',(req ,res)=>{
    if(req.user){
        res.redirect(`./${req.user.googleId}`)
    }else{
        res.redirect(`./guest`)
    }
    
})

router.get('/:user', ensureAuth, async (req, res)=>{

    let user = await User.findOne({ googleId: req.params.user})
    console.log(user)
    console.log("url " + req.originalUrl)
    console.log(req.params)

    res.render('user',{
        msg:"user",
        url: req.originalUrl,
        user:user,
        key: api_key
    })
})


module.exports = router