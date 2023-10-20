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
module.exports.create = (req, res) => {
    // TO DO
}

// Sign In and create a session for the user
module.exports.createSession = (req, res) => {
    // TO DO
}