var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('../helper');

const user = require('../Schema/User');
const deptInfo = require('../Schema/DepartmentInfo');
router.get('/get', (req, res, next) => {
    user.find({}, (err, users) => {
        return res.status(200).send(users);
    })
});

router.post('/login', (req, res, next) => {
    user.findOne({ username: req.body.username, password: req.body.password }, (err, objUser) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (objUser) {
            const tokenStr = jwt.makeToken(objUser);
            const resInfo = {
                dept: objUser.dept,
                token: tokenStr
            }
            return res.status(200).json(resInfo);
        }
        else {
            return res.status(500).send("User not found, please try again");
        }
    });
});

router.get('/getprofile/:deptName', (req, res, next) => {
    deptInfo.findOne({ deptName: req.params.deptName }, (err, dept) => {
        if(!err){
            return res.status(200).send(dept);
        }
        return res.status(500).send(err);
    })
});

router.post('/updateprofile', (req, res, next) => {
    deptInfo.findOneAndUpdate({ deptName: req.body.deptName }, {
        HoD: req.body.HoD,
        email: req.body.email,
        mobile: req.body.mobile
    }, (err, doc, obj) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            console.log(doc, obj);
            return res.status(200).send(obj);
        }
    })
});

// router.post('/initprofile', (req, res, next) => {
//     var arrDept = ["Qa", "Leader", "Planning", "Sample", "Marker", "Marker", "FabricQc", "Cutting", "Numbering", "Trim", "Embroidery", "SewingPlan", "Production", "Packaging", "Imex", "Administration", "Compliance", "Leader", "FabricWarehouse"];
//     arrDept.forEach((value)=>{
//         deptInfo.create({deptName: value});
//     });
//     res.status(200).send("OK");
// })

module.exports = router;