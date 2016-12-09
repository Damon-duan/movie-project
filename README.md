# nodejs练习项目

这个整个项目的第二部分,会包括gulp打包,mocha测试,增加一些功能。

## 使用框架和类库

本项目使用node作为后台开发语言，并以express4.X为类库，mongodb为数据库开发的。
node库使用相关类库

- express4.x
- ejs
- mongoose
- underscore
- path
- body-parser
- es6(因为nodejs从6.X版本开始就支持93%的es6特性了,所以没有用到babel转码)

前端使用相关类库

- bootstrap
- jquery

## 项目介绍

**1. 本地开发环境搭建:**
  * 使用`gulp`集成`jshint`对JS语法检查，`Sass`文件编译、压缩等功能，使用`mocha`完成用户注册存储等步骤的简单单元测试，以及服务器的自动重启等功能。

**2. 网站整体功能:**

  网站正常访问无需管理原权限，以下网站数据的添加及删除功能需要登录默认管理员账号(**在数据库设置role的值**)。

  * 豆瓣电影相同的展示页面;
  * 具有用户注册登录及管理;
  * 电影详情页面添加及删除评论;
  * 电影及电影院信息录入和搜索;
  * 电影分类添加及删除;
  * 电影图片海报自定义上传;
  * 列表分页处理;
  * 访客统计;

## tips
clone或者直接下载本代码库后，需要安装node，mongodb环境，之后再项目根目录下运行npm install 安装应用到的类库。

* 关于mongodb的安装可以参照[这里](http://www.imooc.com/article/14770)
* 如果你不想安装mongodb,可以上https://mlab.com/ 注册申请一个500M的免费mongodb数据库,很方便.

项目页面:
-------
当使用管理员账号登录时(默认账号密码均是1234)可在顶部搜索栏下显示各后台控制页面的链接，方便页面切换。

**豆瓣电影首页:** localhost:3000/

**用户后台页:**
- 用户注册页面: localhost:3000/signup
- 用户登陆页面: localhost:3000/signin
- 用户详情列表页: localhost:3000/admin/user/list

**电影后台页:**
- 详情页:localhost:3000/movie/:id
- 后台录入页:localhost:3000/admin/movie/new
- 列表页:localhost:3000/admin/movie/list
- 分类录入页:localhost:3000/admin/category/new
- 分类页:localhost:3000/admin/category/list
- 电影院录入页:localhost:3000/admin/movie//new
- 电影院列表页:localhost:3000/admin/movie//list


项目结构:
----
```
├── app.js
           项目入口文件
├── app               Node后端MVC文件目录
│   ├── controllers   控制器目录
│   │   ├── movie     电影页面控制器目录
│   │   └── user      用户列表控制器目录
│   ├── models        模型目录
│   │   ├── movie
│   │   └── user
│   ├── schemas       模式目录
│   │   ├── movie
│   │   └── user
│   └── views         视图文件目录
│       ├── components
│       └── pages
├── doubanDatabase    供参考的数据库数据
│   └── douban
├── node_modules      node模块目录
├── public            静态文件目录
│   ├── images        图片目录
│   │   ├── includes  公共图片目录
│   │   ├── movie
│   │   └── user
│   ├── libs          经过gulp处理后文件所在目录
│   │   ├── css
│   │   ├── images
│   │   └── scripts
│   ├── sass          样式目录
│   │   ├── include
│   │   ├── movie
│   ├── scripts       JS脚本目录
│   │   └── js
│   └── upload        用户自定义上传图片存储目录
│       ├── movie
├── route             路由目录
│   └── router.js
├── test              测试文件目录
│   └── user
│       └── user.js
├── README.md
├── gulpfile.js       gulp文件
└── package.json
```

后期完善:
-------
1. 完善网站功能;
2. 优化项目代码;

* 持续更新,后续前端会采用react。

有问题可以加群:  495489065