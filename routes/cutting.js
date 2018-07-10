const express = require('express');
const dirTree = require('directory-tree');
const router = express.Router();
const XLSX = require('xlsx');
const _ = require('lodash');

xoa_dau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

rendercolumns = (columnHeaders, columnStyles, showColumns) => {
    var columns = [];
    for (i = 0; i < columnHeaders.length; i++) {
        columns.push({
            key: columnHeaders[i],
            name: _.startCase(columnHeaders[i]),
            filterable: true,
            width: columnStyles[i].wpx * 2,
            visible: _.indexOf(showColumns, columnHeaders[i]) >= 0 ? true : false,
            resizable: true
        })
    }
    return columns
}

router.get('/listfolder', (req, res, next) => {
    const tree = dirTree(`./upload/file/cutting`);
    res.status(200).send(tree.children);
});

router.get('/:fileName', (req, res, next) => {
    const showColumns = ['order', 'po', 'line', 'description', 'orderQty', 'factoryQty', 'type'];
    const workbook = XLSX.readFile(`./upload/file/cutting/${req.params.fileName}`, { cellStyles: true });
    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(first_worksheet, { defval: '' });
    const newData = data.map((obj) => {
        return _.mapKeys(obj, (v, k) => _.camelCase(xoa_dau(k)));
    });
    const columns = rendercolumns(Object.keys(newData[0]), first_worksheet["!cols"], showColumns)
    res.status(200).send({data:newData, columns: columns});
})

module.exports = router;