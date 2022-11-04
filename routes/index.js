let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv')
const User = require('../models/User')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const webpageLogin = "https://ecampus.scu.edu";
const webpage = "https://ecampus.scu.edu/psc/csprd92/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL"
dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router()
router.use(cookieParser())
router.use(bodyParser.urlencoded({extended : true}))
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

router.post('/getData',async (req ,res)=>{
  console.log(req.body)

  const puppeteer = require('puppeteer')
  const loggedCheck = async (page) => {
      try {
          await page.waitForSelector('#pt_envinfo', { timeout: 10 });
          return true;
      } catch(err) {
          return false;
      }
  };


  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let isLogged = false;

  if (!isLogged) {
      console.log(`Try to log in.`);
      await page.goto(webpageLogin);
      //console.log(await page.content())
      await page.waitForSelector('#userid');
      await page.type('#userid', req.body.username);
      await page.waitForSelector('#pwd');
      await page.type('#pwd', req.body.password);
      await page.waitForSelector('input[name=Submit]');
      await page.click('input[name=Submit]');
      await page.waitForNavigation();
      isLogged = await loggedCheck(page);
  }

  if (!isLogged) {
      throw new Error('Incorrect username or password.')
  }

  await page.goto(webpage)

  console.log(await page.content())

  await browser.close();

})
module.exports = router
