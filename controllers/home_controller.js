const Post = require('../models/post')

module.exports.home = async (req, res) => {
    try {
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: 'user'
        })
        .exec()
        res.render('home', {
            title: 'Home-Codial',
            posts: posts,
        })
    } catch (error) {
        console.log("Error showing posts", error);
    }
}