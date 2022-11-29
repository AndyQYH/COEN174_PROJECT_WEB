module.exports = {
    // if user is authenticated the redirected to next page else redirect to login page
    ensureAuth: function (req, res, next) {
      console.log("ensure auth ...")
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/auth/google')
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