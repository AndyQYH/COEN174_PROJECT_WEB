let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router({mergeParams: true})
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/', ensureAuth, (req ,res)=>{
    res.render('map',{
        msg:"user",
        url: req.url,
        userId: req.user.googleId,
        userImg: req.user.image,
        key: api_key,
        userName: req.user.firstName + ' ' + req.user.lastName,
    })
})

module.exports = router