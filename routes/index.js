let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/',(req ,res)=>{
    res.render('index',{
        msg:'',
        key:api_key
    })
})

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('524569409435-hmbta1vbvgdpfmvfq2m8h5a6df6bv7t5.apps.googleusercontent.com');

router.post('/signIn',async (req ,res)=>{
    console.log("data received:")
    console.log(req.body)
    try{
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: '524569409435-hmbta1vbvgdpfmvfq2m8h5a6df6bv7t5.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const email = payload['email'];
        console.log("emial:" + email);
        let data = email

        res.status(200).send(data)
    }catch (err){
        console.error(err)
        res.status(400).send('invalid sign in, please try again')
    }
    
})

module.exports = router
