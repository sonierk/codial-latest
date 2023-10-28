const Post = require('../models/post')
const Comment = require('../models/comment')
const commentsMailer = require('../mailers/comments_mailer')

module.exports.create = async (req, res) =>{
    try {
        let post = await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post,
            })
            post.comments.push(comment)
            await post.save()
            comment = await comment.populate('user','name email')
            commentsMailer.newComment(comment)

            req.flash('success',"Comment added!!")
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
            req.flash('success',"Comment deleted!!")
            return res.redirect('back')

        } else{
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error);
    }
}
