const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        }).populate('user')

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                },
                message: "Post created!"

            })
        }
        req.flash('success',"Post added!!")
        return res.redirect('back')
    } catch (error) {
       console.log("Error creating Post", error); 
       return
    }
}

module.exports.destroy = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.user == req.user.id){
            await Post.deleteOne({ _id: req.params.id });
            
            await Comment.deleteMany({post: req.params.id})
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }
            req.flash('success',"Post Deleted!!")
            return res.redirect('/');

        }else{
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error);
    }
}