const express = require('express');
const dirTree = require('directory-tree');
const router = express.Router();

router.get('/listfolder/:folderName',(req, res, next) => {    
    const folderNameArr = req.params.folderName.split('-');
    const tree = dirTree(`./upload/file/numbering/${folderNameArr[0]}`);
    res.status(200).send(tree.children);
});

module.exports = router;