let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const User = require('../models/User')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.json())
router.use(express.static('public'))

router.get('/',(req ,res)=>{
    res.render('index',{
        msg:'index',
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
        console.log("email:" + email);
        let data = email

        //
        let mongoose = require("mongoose");
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost:27017/node-demo");
        let nameSchema = new mongoose.Schema({
            email: String,
        });
        let User = mongoose.model("User", nameSchema);
        app.get("/", (req, res) => {
            res.sendFile(__dirname + "/index.html");
        });
        
        app.post("/addname", (req, res) => {
            let myData = new User(req.body);
            myData.save()
                .then(item => {
                    res.send("Name saved to database");
                })
                .catch(err => {
                    res.status(400).send("Unable to save to database");
                });
        });

        //


        res.status(200).send(data)
    }catch (err){
        console.error(err)
        res.status(400).send('invalid sign in, please try again')
    }
    
})

module.exports = router

let app = express();
let port = 3000;
 
app.get("/", (req, res) => {
 res.send("Hello World");
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});