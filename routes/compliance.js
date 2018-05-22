const express = require('express');
const dirTree = require('directory-tree');
const router = express.Router();

router.get('/general',(req, res, next) => {
    const tree = dirTree(`./upload/file/compliance/G`);
    res.status(200).send(tree.children);
});

router.get('/humidity',(req, res, next) => {
    const tree = dirTree(`./upload/file/compliance/H`);
    res.status(200).send(tree.children);
});

router.get('/metal',(req, res, next) => {
    const tree = dirTree(`./upload/file/compliance/M`);
    res.status(200).send(tree.children);
});

module.exports = router;