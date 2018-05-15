var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/datafilms');
/* GET home page. */
var schema = new mongoose.Schema(
    { 
    name: 'string', 
    location: 'string',
    movies: []
    }
);

var Cinema = mongoose.model('Cinema', schema);

router.get('/', function(req, res, next) {
    console.log(req.query)
    if (req.query.id_movie) {
        Cinema.find({_id:req.query.id_movie},function (err, tanks) {
            if (err) return console.error(err);
            res.json(tanks);
          })
    } else {
        Cinema.find(function (err, tanks) {
            console.log("asdsda");            
            if (err) return console.error(err);
            res.json(tanks);
          })
    }
});

router.get('/:id', function(req, res, next) {
    console.log(req)    
        Cinema.findById(req.params.id,function (err, tank) {
            if (err) return console.error(err);
            res.json(tank);
          })     
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    Cinema.create(req.body,function(err,result){
        if (err) return handleError(err);
        res.json(result);
    })    
});

router.post('/movie/:id', function(req, res, next) {
    console.log(req.body)
    Cinema.findById(req.params.id,function(err,result){
        if (err) return handleError(err);
        result.movies.push(req.body)
        Cinema.update(result,function(err,result){
            if (err) return handleError(err);
            res.json(result);
        })  
    })    
});

router.put('/', function(req, res, next) {
    console.log(req.body)
    var data={
        name:req.body.name,
        location:req.body.location,
        movies:req.body.movies
    }
    Cinema.findOneAndUpdate({_id:req.body._id},data,{upsert:true},function(err,result){
        console.log(err);
        if (err) return handleError(err);
        res.json(result);
    })    
});
router.delete('/:id', function(req, res, next) {
    console.log(req.body)
    Cinema.remove({_id: req.params.id},function(err,result){
        if (err) return handleError(err);
        res.json(result);
    })    
});


module.exports = router;
