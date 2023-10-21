const express = require('express') /* 1 */
const cookieParser = require('cookie-parser')
const app = express() /* 2 */
require('dotenv').config()
const connectDB = require('./config/mongoose')
const sassMiddleware = require('node-sass-middleware');


// Use for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'
}))
app.use(express.urlencoded())

app.use(cookieParser())
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('./assets'))
app.use(expressLayouts)

// Extract style and script of subpages to Layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

/* 5 */
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(session({
    name: "codial",
    // Change the secret before deloy to Prod
    secret: "blah",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        autoRemove: 'disabled'
    })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

// Use express route
app.use('/', require('./routes'))

const port = process.env.PORT || 8000 /* 3 */

/* 4 */
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