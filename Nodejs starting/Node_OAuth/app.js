const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const passport = require('passport')
const routes = require('./routes/index')


//load environment
dotenv.config({ path: './config/config.env' });

//passport config
require('./config/passport')(passport)

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}
//routes
app.use("/", require('./routes/index'))
    //handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//passport middle
app.use(passport.initialize())


//session middleware

app.use(session({
        secret: 'oFmDmsD2xf3ympT4olkM_Wtn',
        resave: false,
        saveUninitialized: true,
    }))
    //statistics
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
    //app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in  ${process.env.NODE_ENV} and  on ${PORT}`));