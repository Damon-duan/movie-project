const path=require('path')
const express=require('express')

const session=require('express-session')
const mongoStore=require('connect-mongo')(session)

const mongoose=require('mongoose')

const port = process.env.PORT||3000
const app=express()

const dbUrl='mongodb://cllgeek:cll375587295@ds157677.mlab.com:57677/movie'

mongoose.connect(dbUrl)

app.set('views','./app/views')
app.set('view engine','ejs')

// 静态资源请求路径
app.use(express.static(path.join(__dirname,'public')))
app.use(require('body-parser').urlencoded({extended:true})) //表单提交 数据格式化

app.use(require('connect-multiparty')())

app.use(session({
  secret:'react',
  store:new mongoStore({
    url:dbUrl,
    collection:'sessions'
  })
}))

app.locals.moment=require("moment")

app.listen(port)

console.log('movie started on port' + port)



require('./config/routes')(app)

