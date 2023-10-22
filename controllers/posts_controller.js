const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        })
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
            req.flash('success',"Post Deleted!!")
            return res.redirect('/');

        }else{
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error);
    }
}