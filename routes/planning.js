var express = require('express');
var router = express.Router();
const _ = require('lodash');

const productionPlanning = require('../Schema/ProductionPlanning');

router.get('/production/',(req,res,next) => {
    productionPlanning.find({}, (err, docs) => {
        if (err)
            return res.status(500).send(err.message);
        res.status(200).send(docs);
    });
});

module.exports = router;