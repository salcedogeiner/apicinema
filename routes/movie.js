var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/datafilms');
/* GET home page. */
var schema = new mongoose.Schema(
    { 
    name: 'string', 
    date: 'date',
    language: 'string'
    }
);
var Movie = mongoose.model('Movie', schema);

router.get('/', function(req, res, next) {
    console.log(req.query)
    if (req.query.id_movie) {
        Movie.find({_id:req.query.id_movie},function (err, tanks) {
            if (err) return console.error(err);
            res.json(tanks);
          })
    } else {
        Movie.find(function (err, tanks) {
            console.log("asdsda");            
            if (err) return console.error(err);
            res.json(tanks);
          })
    }
});

router.get('/:id', function(req, res, next) {
    console.log(req)    
        Movie.findById(req.params.id,function (err, tank) {
            if (err) return console.error(err);
            res.json(tank);
          })     
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    Movie.create(req.body,function(err,result){
        if (err) return handleError(err);
        res.json(result);
    })    
});

router.put('/', function(req, res, next) {
    console.log(req.body)
    Movie.update(req.body,function(err,result){
        if (err) return handleError(err);
        res.json(result);
    })    
});

router.delete('/:id', function(req, res, next) {
    console.log(req.body)
    Movie.remove({_id: req.params.id},function(err,result){
        if (err) return handleError(err);
        res.json(result);
    })    
});


module.exports = router;
