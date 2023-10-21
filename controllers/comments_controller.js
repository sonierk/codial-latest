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

module.exports.destroy = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if(comment.user == req.user.id){
            let postId = comment.post
            await Comment.deleteOne({ _id: req.params.id });

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}})
            return res.redirect('back')
        } else{
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error);
    }
}
