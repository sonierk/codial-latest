const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/mongoose')
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

const port = process.env.PORT || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log(`Connected to DB`);
        app.listen(port, console.log(`Server listening on port: ${port}...`))
        
    } catch (error) {
        console.log(error);
    }
 }

 start()