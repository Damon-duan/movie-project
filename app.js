const path=require('path')
const express=require('express')

const session=require('express-session')
const mongoStore=require('connect-mongo')(session)

const fs=require('fs')

const mongoose=require('mongoose')

const app=express()


const dbUrl='mongodb://cllgeek:cll375587295@ds157677.mlab.com:57677/movie'

mongoose.connect(dbUrl)


app.set('views','./app/views')
app.set('view engine','ejs')

// 静态资源请求路径
app.use(express.static(path.join(__dirname,'public')))
app.use(require('body-parser').urlencoded({extended:true})) //表单提交 数据格式化

app.use(require('connect-multiparty')())

// models loading
var models_path = __dirname + '/app/models';            // 模型所在路径

// 路径加载函数，加载各模型的路径,所以可以直接通过mongoose.model加载各模型 这样即使模型路径改变也无需更改路径
let walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      let newPath = path + '/' + file;
      let stat = fs.statSync(newPath);
      // 如果是文件
      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath);
        }
      // 如果是文件夹则继续遍历
      }else if (stat.isDirectory()) {
        walk(newPath);
      }
    });
};
walk(models_path);                                  // 加载模型所在路径

app.use(session({
  secret:'react',                          // 设置的secret字符串，来计算hash值并放在cookie中
  resave: false,                                    // session变化才进行存储
  saveUninitialized: true,
  // 使用mongo对session进行持久化，将session存储进数据库中
  store: new mongoStore({
    url: dbUrl,                                     // 本地数据库地址
    collection: 'sessions'                          // 存储到mongodb中的字段名
  })
}));

app.locals.moment=require("moment")

require('./config/routes')(app)

module.exports=app
