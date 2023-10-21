const Post = require('../models/post')

module.exports.home = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.render('home', {
            title: 'Home',
            posts: posts,
        })
    } catch (error) {
        console.log("Error showing posts", error);
    }
}