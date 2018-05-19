const express = require('express');
const dirTree = require('directory-tree');
const router = express.Router();
const _ = require('lodash');
const XLSX = require('xlsx');

router.get('/production',(req,res,next) => {
    const tree = dirTree(`./upload/file/plan/P`);
    res.status(200).send(tree.children);
});

router.get('/production/:fileName',(req,res,next) => {
    const workbook = XLSX.readFile(`./upload/file/plan/P/${req.params.fileName}`);
    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(first_worksheet);
    const newData = data.map((obj) => {
        return _.mapKeys(obj, (v, k) => _.camelCase(k));
    });
    res.status(200).send(newData);
});

router.get('/booking',(req,res,next) => {
    const tree = dirTree(`./upload/file/plan/B`);
    res.status(200).send(tree.children);
});

router.get('/shipping',(req,res,next) => {
    const tree = dirTree(`./upload/file/plan/S`);
    res.status(200).send(tree.children);
});

module.exports = router;