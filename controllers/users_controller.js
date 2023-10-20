const User = require('../models/user')

module.exports.profile = (req, res) => {
    res.render('user_profile', {
        title: "Profile"
    })
}

module.exports.signUp = (req, res)=> {
    res.render('user_sign_up', {
        title: "Codial | Sign Up"
    })
}

module.exports.signIn = (req, res)=> {
    res.render('user_sign_in', {
        title: "Codial | Sign In"
    })
}

// Get the Sign Up data
module.exports.create = async (req, res) => {
    try {
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back')
        }
        const user = await User.findOne({email: req.body.email})
        if(!user){
            await User.create(req.body)
            res.redirect('/users/sign-in')
        }else{
            res.redirect('back')
        }
    } catch (error) {
        console.log('MYError',error);
    }
}


// Sign In and create a session for the user
module.exports.createSession = (req, res) => {
    // TO DO
}