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
  // Grab keywords
  const html = await page.content() // string of html page
  const dates = ['Monday','Tuesday','Wednesday','Thursday','Friday']
  const htmlKeyword = '<br>'
  let htmlPosition = 0
  let courseInfoCache = []
  endIdx = html.indexOf(htmlKeyword, htmlPosition);
  while (true) {
    // Next steps: 
    // 1. Delete redundant info
    if (endIdx != -1) {
        startIdx = html.lastIndexOf('>', endIdx) + 1; // grab the previous phrase in front of <br>\
        
        courseInfo = html.substring(startIdx, endIdx);
        if (!dates.includes(courseInfo)) {
            courseInfoCache.push(courseInfo)
        }
        if (courseInfo.lastIndexOf(':') === 10) { // if courseInfo is time, append the location
            //console.log(courseInfo.lastIndexOf(':'))
            locStart = endIdx + 4; // start with the character right after <br>
            locEnd = html.indexOf('<', locStart);
            courseLocation = html.substring(locStart, locEnd);
            courseInfoCache.push(courseLocation)
            courseInfoCache.push("---------------------")
        }
        htmlPosition = endIdx + 1;
        endIdx = html.indexOf(htmlKeyword, htmlPosition);
    }
    else {
        break
    }
  }
  console.log("Success")
  //console.log(html)
  console.log(courseInfoCache)
  

  await browser.close();

})
module.exports = router
