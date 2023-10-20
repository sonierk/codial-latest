module.exports.home = (req, res) => {
    console.log('Cookies', req.cookies);
    res.cookie('user_id', 007)
    res.render('home', {
        title: 'Home'
    })
}