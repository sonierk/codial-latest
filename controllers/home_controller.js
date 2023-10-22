const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = async (req, res) => {
    try {
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: 'user'
        })
        .exec()
        const users = await User.find({})
        res.render('home', {
            title: 'Home-Codial',
            posts: posts,
            all_users: users
        })
    } catch (error) {
        console.log("Error showing posts", error);
    }
}