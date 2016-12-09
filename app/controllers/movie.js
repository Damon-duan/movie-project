const Movie=require('../models/movie')
const Comment=require('../models/comment')
const Category=require('../models/category')

const fs=require('fs')
const path=require('path')

// detail page
exports.detail=(req,res)=>{
    let id=req.params.id;

    Movie.update({_id:id},{$inc:{pv:1}},(err)=>{
      if(err){
        console.log(err)
      }
    })

    Movie.findById(id,(err,movie)=>{
      Comment
        .find({movie:id})
        .populate('from','name')
        .populate('reply.from reply.to','name')
        .exec((err,comments)=>{
          res.render('detail',{
            title:'详情'+movie.title,
            movie:movie,
            comments:comments
          })
        })
    })
}

// admin page
exports.new=(req,res)=>{
    Category.find({},(err,categories)=>{
      res.render('admin',{
        title:'react 后台录入页',
        categories:categories,
        movie:{}
      })
    })
}

//admin update movie
exports.update=(req,res)=>{
    const id=req.params.id

    if(id){
      Movie.findById(id,(err,movie)=>{
       Category.find({},(err,categories)=>{
          res.render('admin',{
            title:'电影后台更新页页',
            movie:movie,
            categories:categories
          })
        })
      })
    }
}

// admin poster
exports.savePoster=(req,res,next)=>{

  let posterData=req.files.uploadPoster
  let filePath=posterData.path
  let originalFilename=posterData.originalFilename

  if(originalFilename){
    fs.readFile(filePath,(err,data)=>{
      let timestamp=Date.now()
      let type=posterData.type.split('/')[1]
      let poster=timestamp+'.'+type
      let newPath=path.join(__dirname,'../../','/public/upload/'+poster)

      fs.writeFile(newPath,data,(err)=>{
        req.poster=poster
        next()
      })
    })
  }else{
    next()
  }
}

//admin post movie
exports.save=(req,res)=>{
  let id=req.body.movie._id;
  let movieObj=req.body.movie;

  if(req.poster){
    movieObj.poster=req.poster
  }

  if(id){
    let conditions={_id:id};
    let update={$set:{director:movieObj.director,title:movieObj.title,country:movieObj.country,
    language:movieObj.language,year:movieObj.year,poster:movieObj.poster,summary:movieObj.summary,
    flash:movieObj.flash,category:movieObj.category}};
    let options={upsert:true};
    Movie.findOneAndUpdate(conditions,update,options,function(err){
      if(err){
        console.log(err)
      }

      res.redirect('/movie/'+id)
    })
  }else{

      let _movie=new Movie({
        director:movieObj.director,
        title:movieObj.title,
        country:movieObj.country,
        language:movieObj.language,
        year:movieObj.year,
        poster:movieObj.poster,
        summary:movieObj.summary,
        flash:movieObj.flash,
        category:movieObj.category
      })

      let categoryId=movieObj.category
      let categoryName=movieObj.categoryName

      _movie.save((err,movie)=>{
          if(err){
            console.log(err)
          }
          if (categoryId) {
            Category.findById(categoryId, function(err, category) {
              category.movies.push(movie._id)

              category.save(function(err, category) {
                res.redirect('/movie/' + movie._id)
              })
            })
          }
          else if (categoryName) {
            let category = new Category({
              name: categoryName,
              movies: [movie._id]
            })

            category.save(function(err, category) {
              movie.category = category._id
              movie.save(function(err, movie) {
                res.redirect('/movie/' + movie._id)
              })
            })
          }
      })
    }
}

// list page
exports.list=(req,res)=>{
  Movie.find({})
    .populate('category','name')
    .exec((err,movies)=>{
      if(err){
        console.log(err)
      }

      res.render('list',{
        title:'电影 列表页',
        movies:movies
      })
    })
}

//list delete movie
exports.del=(req,res)=>{
  const id=req.query.id

  if(id){
    Movie.remove({_id:id},function(err,movie){
      if(err){
        console.log(err)
      }
      else{
        res.json({success:1})
      }
    })
  }
}