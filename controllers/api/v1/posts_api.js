
const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async (req, res)=> {

    const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: 'user'
        })
        .exec()
    console.log(posts);

    return res.status(200).json({
        message: "List of Posts",
        posts: posts
    })
}

module.exports.destroy = async (req, res)=>{
    try {
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id){
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({post: req.params.id})
            res.status(200).json({
                message: "Post and associated Comments deleted sucessfully"
            })
        }else{
            return res.status(401).json({
                message: "you cannot delete this post"
            })
        }
        

    } catch (error) {
        return res.status(500).json({
            message: "Internal server Error",
        })
    }
}