const Post = require('../models/post')

module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        })
        return res.redirect('back')
    } catch (error) {
       console.log("Error creating Post", error); 
       return
    }
}