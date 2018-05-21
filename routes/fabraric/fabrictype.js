var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const fabrictype = require('../../Schema/FabricType');


router.get('/get',(req,res,next)=>{
    user.find({},(err,fabrictype)=>{
        return res.status(200).send(fabrictype);
    })
})

module.exports = router;