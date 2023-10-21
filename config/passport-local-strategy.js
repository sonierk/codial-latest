// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const user = require('../models/user')

// // Authentication using password
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     },
//     function (email, password,done) {
//         // find the user and establish identity
//         user.findOne({email: email}, function(err, user){
//             if(err){
//                 console.log('Error - user not found');
//                 return done(err)
//             }
//             if(!user || user.password != password){
//                 console.log('Invalid username/password');
//                 return done(null, false)
//             }
//             return done(null, user)
//         })
//     }
// ))

// // serializing the user to decide which key to kept in the cookies
// passport.serializeUser(function(user,done){
//     done(null, user.id)
// })

// // deserializing the user from the key in the cookie
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error - user not found==Passport');
//             return done(err)
//         }
//         return done(null, user)
//     })
// })

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Assuming you have a User model

// Authentication using password
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log('Invalid username/password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error - user not found');
      return done(err);
    }
  })
);

// Serializing the user to decide which key to keep in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the user from the key in the cookie
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log('Error - user not found==Passport');
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    console.log('Error - user not found==>Passport');
    return done(err);
  }
});

// Check if the user is authenticated  
passport.checkAuthentication = (req, res, next)=>{
    // If the user is sign in pass on the request to the next functions.
    if(req.isAuthenticated()){
        return next()
    }
    // If user is not authenticated
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views.
        res.locals.user = req.user
    }
    next()
}   

module.exports = passport