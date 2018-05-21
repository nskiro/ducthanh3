var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


const fabrictype = require('../../Schema/FabricType');
const fabriccolor = require('../../Schema/FabricColor');
const fabricwarehouse = require('../../Schema/FabricWareHouse');
const fabricwarehousedetail = require('../../Schema/FabricWareHouseDetail');

router.get('/get',(req,res,next)=>{
    user.find({},(err,fabricwarehouse)=>{
        return res.status(200).send(fabricwarehouse);
    })
})

module.exports = router;