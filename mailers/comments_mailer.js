const nodeMailer = require('../config/nodemailer')

exports.newComment = (comment)=> {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'test@codial.com',
        to: comment.user.email,
        subject: "New comment published",
        // html: '<h1>your comment is now publised <strong>TEST</strong> </h1>'
        html: htmlString
    },(err, info)=> {
        if(err){
            console.log('Error in sending', err);
            return
        }
        console.log('Mail sent', info);
        return
    })
}