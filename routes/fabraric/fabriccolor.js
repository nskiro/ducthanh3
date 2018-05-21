var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const fabriccolor = require('../../Schema/FabricColor');

router.get('/get',(req,res,next)=>{
    user.find({},(err,fabriccolor)=>{
        return res.status(200).send(fabriccolor);
    })
})


module.exports = router;