const User=require('../models/user')

// signup
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面'
  })
}

exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录页面'
  })
}

exports.signup=(req,res)=>{
  const _user=req.body.user

  User.findOne({name:_user.name},(err,user)=>{
    if(err){
      console.log(err)
    }
    if(user){
      return res.redirect('/signin')
    }else{
      const user=new User(_user)
      user.save(function(err,user){
      if(err){
        console.log(err)
      }

      res.redirect('/admin/user/list')
    })
    }
  })

}


// signin
exports.signin=(req,res)=>{
  const _user=req.body.user
  const name=_user.name
  const password=_user.password

  User.findOne({name:name},(err,user)=>{
    if(err){
      console.log(err)
    }
    if(!user){
      return res.redirect('/')
    }
    user.comparePassword(password,(err,isMatch)=>{
      if(err){
        console.log(err)
      }

      if(isMatch){
        req.session.user=user

        return res.redirect('/')
      }else{
        console.log('Password is not matched')
      }
    })
  })
}

// logout
exports.logout=(req,res)=>{
  delete req.session.user
  //delete app.locals.user

  res.redirect('/')
}

// userlist page
exports.list=(req,res)=>{
    User.fetch((err,users)=>{
      if(err){
        console.log(err);
      }
      res.render('userlist',{title:'react-用户列表页',users:users});
    })
}

// midware for user
exports.signinRequired=(req,res,next)=>{
    const user=req.session.user

    if(!user){
      return res.redirect('/signin')
    }

    next()
}

exports.adminRequired=(req,res,next)=>{
    const user=req.session.user

    if(user.role<=10){
      return res.redirect('/signin')
    }

    next()
}