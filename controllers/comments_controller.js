const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = async (req, res) =>{
    try {
        const post = await Post.findById(req.body.post)
        if(post){
            const comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post,
            })
            post.comments.push(comment)
            await post.save()
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}
