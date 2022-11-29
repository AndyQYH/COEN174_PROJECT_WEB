let express = require('express')
let dotenv = require('dotenv')
let expressLayouts = require('express-ejs-layouts')
let bodyParser = require('body-parser')
let methodOverride = require('method-override')
let passport = require('passport')
const session = require('express-session')
const {setup} = require('./config/passport')
passport = setup(passport)
let mapRouter = require('./routes/map')
let indexRouter = require('./routes/index')
let scheduleRouter = require('./routes/schedule')
let userRouter = require('./routes/users')
let authRouter = require('./routes/auth')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()
const PORT= parseInt(process.env.PORT);
const HOST= process.env.SERVER
console.log("port: " + PORT)

app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
      secret: 'campus scheduler SCU',
      resave: false,
      saveUninitialized: false
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 
 })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/',indexRouter)
app.use('/log-in',userRouter)
app.use('/schedule',scheduleRouter)
app.use('/map', mapRouter)
app.use('/auth',authRouter)


app.listen(PORT, ()=>{
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
