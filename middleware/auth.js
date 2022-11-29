const User = require('../models/User')

module.exports = {
    // if user is authenticated the redirected to next page else redirect to login page
    ensureAuth: async function (req, res, next) {
      console.log("ensure auth ...")
      if (req.isAuthenticated()) {
        return next()
      } else {
        if(req.params.id){
          console.log("has google id ... ")
          console.log(req.params.id)
          if(req.user){
            let user = await User.findOne({ googleId: req.params.id})
            if(user){
              if(user.id != req.user.GoogleId){
                res.status(403).render('error',{
                  msg:'Access Not Allowed',
                  status: 403,
                  userinfo: req.user.email,
                  userId: req.user.googleId,
                  userImg: req.user.image,
                  key: api_key
                })
              }
            }else{
              res.redirect(`/user/${req.params.id}`)
            }
             
          }else{
            
            res.status(404).render('error',{
              msg:'Page Not Found',
              status: 404,
              userinfo: "",
              userId: req.user.googleId,
              userImg: req.user.image,
              key: api_key
            })
            
          }
          
        }else{
          res.redirect('/auth/google')
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
  }