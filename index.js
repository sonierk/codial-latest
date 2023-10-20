const express = require('express')
const app = express()
const port = 8000
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('./assets'))
app.use(expressLayouts)

// Extract style and script of subpages to Layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

// Use express route
app.use('/', require('./routes'))

app.set('view engine', 'ejs')
app.set('views', './views')

app.listen(port,function (err) {
    if(err){
        console.log(`Error in running the sever on: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
})