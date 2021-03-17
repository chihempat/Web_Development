const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
const MongoDBStore = require('connect-mongodb-session')(session);

//load environment
dotenv.config({ path: './config/config.env' });

//passport config
require('./config/passport')(passport)

const app = express();
//connect db to
connectDB()


// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//methodOverride
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}
//handlebars helper
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')
    //handlebars
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    },
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(session({
    secret: 'oFmDmsD2xf3ympT4olkM_Wtn',
    resave: true,
    saveUninitialized: false,
    //cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })

}))

//passport middle
app.use(passport.initialize())
app.use(passport.session())



// Set global var
app.use(function(req, res, next) {
    res.locals.user = req.user || null
    next()
})


//statistics
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in  ${process.env.NODE_ENV} and  on ${PORT}`));