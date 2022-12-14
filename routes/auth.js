//Importing required modules 
const express = require('express')
const passport = require('passport')
const router = express.Router()
router.use(express.static('public'))

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      console.log('google callback')
      console.log(req)
      console.log(res)
      res.redirect('/user/')
    }
)

router.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    })

})
  
module.exports = router