let express = require('express')
let bodyParser = require('body-parser')
let dotenv = require('dotenv')
const {body, checkSchema, validationResult} = require('express-validator');
const puppeteer = require('puppeteer')
const UserCourse = require('../models/UserCourse')
const User = require('../models/User')
const ECampus= require('../models/ECampus')
const webpageLogin = "https://ecampus.scu.edu";
const { ensureAuth, ensureGuest } = require('../middleware/auth')

dotenv.config()

const api_key = process.env.GOOGLE_KEY
console.log(api_key)
const router = express.Router({mergeParams: true})
router.use(bodyParser.json())
router.use(express.static('public'))

router.get("/",ensureAuth, async(req,res)=>{
    //console.log(req.user)
    let userImg = ''
    let user = await User.findOne({ email: req.user.email})
    if(user){
        userImg = user.image
    }
    
    let userCourse = await UserCourse.find({email: user.email})

    if (userCourse) {
        console.log(userCourse)
    }

    res.render('schedule',{
        msg:"user",
        url: req.url,
        userId: user.googleId,
        userImg: userImg,
        key: api_key,
        userCourse:userCourse,
        userName: req.user.firstName + ' ' + req.user.lastName,
    })
})


router.post('/getData', ensureAuth,checkSchema(ECampus),async (req ,res)=>{
  console.log(req.user)

  const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

  console.log(req.body)
  var email=req.user.email
  const loggedCheck = async (page) => {
      try {
          await page.waitForSelector('#pt_envinfo', { timeout: 10 });
          return true;
      } catch(err) {
          return false;
      }
  };

  const browser = await puppeteer.launch();
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

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
    console.log("Incorrect username or password")
    res.statusCode=400
    await browser.close();
    res.redirect('/')
    return;
  }
  await page.goto(webpage)
  // Grab keywords
  const html = await page.content() // string of html page
  //const html ="<table cellspacing=\"0\" cellpadding=\"2\" width=\"100%\" class=\"PSLEVEL3GRIDODDROW\" id=\"WEEKLY_SCHED_HTMLAREA\" summary=\"Weekly Schedule\">\n<colgroup span=\"1\" width=\"15%\" align=\"center\" valign=\"middle\">\n</colgroup><colgroup span=\"5\" width=\"17%\" align=\"center\" valign=\"middle\"></colgroup><tbody><tr><th scope=\"col\" align=\"center\" class=\"PSLEVEL3GRIDODDROW\">Time</th><th scope=\"col\" align=\"center\" class=\"PSLEVEL3GRIDODDROW\">Monday<br>\nNov 7</th><th scope=\"col\" align=\"center\" class=\"PSLEVEL3GRIDODDROW\">Tuesday<br>\nNov 8</th><th scope=\"col\" align=\"center\" class=\"PSLEVEL3GRIDODDROW\">Wednesday<br>\nNov 9</th><th scope=\"col\" align=\"center\" class=\"PSLEVEL3GRIDODDROW\">Thursday<br>\nNov 10</th><th scope=\"col\" align=\"center\" class=\"PSLEVEL3GRIDODDROW\">Friday<br>\nNov 11</th></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">7:00AM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">8:00AM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">9:00AM</span></td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  174 - 01<br>Lecture<br>9:15AM - 10:20AM<br>O'Connor Hall 206</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  174 - 01<br>Lecture<br>9:15AM - 10:20AM<br>O'Connor Hall 206</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  174 - 01<br>Lecture<br>9:15AM - 10:20AM<br>O'Connor Hall 206</span></td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">10:00AM</span></td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(222,184,135);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(222,184,135);\">COEN  174 - 01<br>Lecture<br>9:15AM - 10:20AM<br>O'Connor Hall 206<br><img border=\"0\" src=\"/cs/csprd92/cache/PTADS_WARNING_ICN_1.gif\" alt=\"Time Conflict\" title=\"Time Conflict\"><br>MATH  166 - 01<br>Lecture<br>10:30AM - 11:35AM<br>O'Connor Hall 107</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(222,184,135);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(222,184,135);\">COEN  174 - 01<br>Lecture<br>9:15AM - 10:20AM<br>O'Connor Hall 206<br><img border=\"0\" src=\"/cs/csprd92/cache/PTADS_WARNING_ICN_1.gif\" alt=\"Time Conflict\" title=\"Time Conflict\"><br>MATH  166 - 01<br>Lecture<br>10:30AM - 11:35AM<br>O'Connor Hall 107</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(222,184,135);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(222,184,135);\">COEN  174 - 01<br>Lecture<br>9:15AM - 10:20AM<br>O'Connor Hall 206<br><img border=\"0\" src=\"/cs/csprd92/cache/PTADS_WARNING_ICN_1.gif\" alt=\"Time Conflict\" title=\"Time Conflict\"><br>MATH  166 - 01<br>Lecture<br>10:30AM - 11:35AM<br>O'Connor Hall 107</span></td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">11:00AM</span></td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">MATH  166 - 01<br>Lecture<br>10:30AM - 11:35AM<br>O'Connor Hall 107</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">MATH  166 - 01<br>Lecture<br>10:30AM - 11:35AM<br>O'Connor Hall 107</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">MATH  166 - 01<br>Lecture<br>10:30AM - 11:35AM<br>O'Connor Hall 107</span></td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">12:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">1:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">2:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"3\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  174L - 02<br>Laboratory<br>2:15PM - 5:00PM<br>Heafey 111</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"3\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  161L - 01<br>Laboratory<br>2:15PM - 5:00PM<br>Heafey 215</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">3:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"2\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  194 - 12<br>Project Design<br>3:30PM - 4:35PM<br>Location: TBA</span></td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">4:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">5:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"3\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  161 - 01<br>Lecture<br>5:40PM - 7:20PM<br>Sobrato Cmps-Discover-Innovate 1301</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"3\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);text-align: center;\"><span class=\"\" style=\"color:rgb(0,0,0);background-color:rgb(182,209,146);\">COEN  161 - 01<br>Lecture<br>5:40PM - 7:20PM<br>Sobrato Cmps-Discover-Innovate 1301</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">6:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">7:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">8:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr><tr><td class=\"PSLEVEL3GRIDODDROW\" rowspan=\"1\" scope=\"row\"><span class=\"\">9:00PM</span></td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td><td class=\"PSLEVEL3GRIDODDROW\">&nbsp;</td></tr></tbody></table>";
  const dates = ['Monday','Tuesday','Wednesday','Thursday','Friday']
  const htmlKeyword = '<br>'
  let htmlPosition = 0
  let courseInfoCache = []
  /**
   * Main Algorithm for getting course info
   */
  while (true) {
    // Next steps: 
    // 1. Delete redundant info
    endIdx = html.indexOf(htmlKeyword, htmlPosition);
    if (endIdx != -1) {
        
        startIdx = html.lastIndexOf('>', endIdx) + 1; // grab the previous phrase in front of <br>\
        
        courseInfo = html.substring(startIdx, endIdx);
        if (!dates.includes(courseInfo)) {
            courseInfoCache.push(courseInfo)
        }
        // if courseInfo is time, append the location and add a divide line
        if (courseInfo.lastIndexOf(':') === 10 || courseInfo.lastIndexOf(':') === 11 || courseInfo.lastIndexOf(':') === 12) { 
            console.log(courseInfo.lastIndexOf(':'))
            locStart = endIdx + 4; // start with the character right after <br>
            locEnd = html.indexOf('<', locStart);
            courseLocation = html.substring(locStart, locEnd);
            courseInfoCache.push(courseLocation)
            courseInfoCache.push("---------------------")
        }
        htmlPosition = endIdx + 1;
    }
    else {
        break
    }
  }
  console.log("Success")
  //console.log(html)
  console.log(courseInfoCache)

  //remove course info with wrong format (guaranteed to be repeated)
  let courseInfoCounter = 0;
  while(courseInfoCounter < courseInfoCache.length) {
    if (courseInfoCache[courseInfoCounter] === '') {
        for (let k = 1; k <= 7; k++) {
            courseInfoCache.splice(courseInfoCounter - 1, 1)
        }
    }
    courseInfoCounter++
  }
  console.log("Update")
  console.log(courseInfoCache)
  // Create a set getting unique names for the courses
  courseInfoSet = new Set()
  for (let i = 0; i < courseInfoCache.length; i+=5) { // every course title is separated by 5
    if (!courseInfoSet.has(courseInfoCache[i])){
        courseInfoSet.add(courseInfoCache[i]);
    }
    else { // delete redundant
        for (let j = 1; j <= 5; j++) {
            courseInfoCache.splice(i, 1)
        }
        i -= 5
    }
    
  }
  //console.log(courseInfoSet)
  console.log("Unrepeated course info")
  console.log(courseInfoCache)
  // Remove all repeated courses
  for (let i = 0; i < courseInfoCache.length; i+=5) {
    let course = {
        email: email,
        courseName: courseInfoCache[i],
        courseType: courseInfoCache[i+1],
        day: 'MWF',
        time: courseInfoCache[i+2],
        location: courseInfoCache[i+3]
      }
    
      try {
        //find the course in our database 
        let userCourse = await UserCourse.findOne({ email: email,courseName:courseInfoCache[i] })
    
        if (!userCourse) {
          // if course is not preset in our database save user data to database.
          userCourse = await UserCourse.create(course)
        }
      } catch (err) {
        console.error(err)
      }
  }

  await browser.close();
  
  res.status(200).json({
    success: true,
    message: 'Registration successful',
    })
})

module.exports = router;