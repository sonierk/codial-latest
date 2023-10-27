    const passport = require('passport')
    const JWTStrategy = require('passport-jwt').Strategy
    const User = require('../models/user')

    const JWTExtractor = require('passport-jwt').ExtractJwt

    var opts = {
        jwtFromRequest: JWTExtractor.fromAuthHeaderAsBearerToken(),
        secretOrKey:'secret'
    }

    passport.use(new JWTStrategy(opts, async function(jwtPayload,done){
        try {
            let user = await User.findById(jwtPayload._id)
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
        } catch (error) {
            console.log('Error finding user from JWT', error);
        }
    }))

    module.exports = passport