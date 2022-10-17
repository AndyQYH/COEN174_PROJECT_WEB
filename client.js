var express = require('express')
var dotenv = require('dotenv')
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
//var sqliteDB = require('./models/db')
//var mainRouter = require('./routes/main')
var indexRouter = require('./routes/index')
//var userRouter = require('./routes/users')


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
//app.use('/', mainRouter)
app.use('/',indexRouter)
//app.use('/log-in',userRouter)
//app.use('/sessions',sessionRouter)
app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, ()=>{
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
