let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
let axios = require('axios')

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
    //console.log("data received:")
    //console.log(req.body)
    axios.post('https://j6pl0njl4a.execute-api.us-west-1.amazonaws.com/default/COEN174AccessData', JSON.stringify(req.body))
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.status(200).send(response.data)
      })
      .catch(function (error) {
        console.log(error.data);
        res.status(400).send(error.data)
      });
    
})

module.exports = router
