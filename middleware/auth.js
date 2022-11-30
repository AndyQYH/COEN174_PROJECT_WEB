const User = require('../models/User')
let dotenv = require('dotenv')

dotenv.config()

api_key = process.env.GOOGLE_KEY

module.exports = {
    // if user is authenticated the redirected to next page else redirect to login page
    ensureAuth: async function (req, res, next) {
      console.log("ensure auth ...")
      if (req.isAuthenticated()) {
        if(req.params.user != req.user.googleId){
          res.status(403).render('error',{
            msg:'Access Not Allowed',
            status: 403,
            user: req.user,
            key: api_key,
            url:req.url
          })
        }else{
          return next()
        }
        return next()
      } else {
        if(req.params.user){
          console.log("has google id ... ")
          console.log(req.params.user)
          
          if(req.params.user == 'guest'){
            console.log('guest bypass')
            return next()
          }else{
            let user = await User.findOne({googleId:'guest'})
            res.status(404).render('error',{
              msg:'Page Not Found',
              status: 404,
              user:user,
              key: api_key,
              url:req.url
            })
          }        
        }else{
            let user = await User.findOne({googleId:'guest'})
              res.status(404).render('error',{
                msg:'Page Not Found',
                status: 404,
                user:user,
                key: api_key,
                url:req.url
              })
        }
        
      }
    },
    // if user is authenticated and going to login page then redirected to home page if not authenticated redirected to login page  .
    ensureGuest: function (req, res, next) {
      console.log("ensure guest ...")
      console.log(req.url)
      if (!req.isAuthenticated()) {
        console.log("not authenticated ...")
        return next()
      } else {
        console.log("authenticated ...")
        res.redirect(`/user/${req.user.GoogleId}`)
      }
    },
    checkUser: async function(req, res, next) {
      const SecurePaths = ['/', '/user', '/auth'];
      console.log(req.url.split('/')[0])
      if (SecurePaths.includes(req.url.split('/')[0]+"/")) return next();
    
      //authenticate user
      console.log("not authenticated")
      let user = await User.findOne({googleId:'guest'})
              res.status(404).render('error',{
                msg:'Page Not Found',
                status: 404,
                user:user,
                key: api_key,
                url:req.url
              })

      
    }
  }