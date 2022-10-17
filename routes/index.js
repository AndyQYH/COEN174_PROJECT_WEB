let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')

const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/',(req ,res)=>{
    res.render('index',{
        msg:''
    })
})

module.exports = router