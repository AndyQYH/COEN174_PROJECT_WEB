let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const User = require('../models/User')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/', ensureGuest,(req ,res)=>{
    res.render('index',{
        msg:'index',
        userinfo:'',
        key:api_key
    })
})

router.get("/user",ensureAuth, async(req,res)=>{
    res.render('index',{
        msg:"user",
        userinfo:req.user,
        key:api_key
    })
})

module.exports = router
