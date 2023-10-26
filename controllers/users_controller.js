const User = require('../models/user')
const fs = require('fs')
const path = require('path')

module.exports.profile = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.render('user_profile', {
        title: "Profile",
        profile_user: user
    })
}

module.exports.update = async (req, res) => {
    // try {
    //     if(req.user.id == req.params.id){
    //         let user = await User.findByIdAndUpdate(req.params.id, req.body)
    //         return res.redirect('back')
    //     }  
    // } catch (error) {
    //     console.log(error);
    // }
    try {
        let user = await User.findById(req.params.id)
        User.uploadedAvatar(req, res, function(err){
            if(err){console.log('***Multer Error***', err);}
            user.name = req.body.name
            user.email = req.body.email

            if(req.file){

                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                }
                user.avatar = User.avatarPath + '/' + req.file.filename
            }
            user.save()
            return res.redirect('back')
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.signUp = (req, res)=> {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    res.render('user_sign_up', {
        title: "Codial | Sign Up"
    })
}

module.exports.signIn = (req, res)=> {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
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
    req.flash('success',"Logged In Successfully!!")
    return res.redirect('/')
}

// The req.logout() is a method of passport
module.exports.destroySession = (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      req.flash('success',"Logged Out Successfully!!")
      res.redirect("/");
    });
  };