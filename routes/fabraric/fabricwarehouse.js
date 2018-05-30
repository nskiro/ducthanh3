var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const _ = require('lodash');

const FabricImport = require('../../Schema/FabricImport');
const FabricImportDetail = require('../../Schema/FabricImportDetail');

const FabricExport = require('../../Schema/FabricExport');
const FabricExportDetail = require('../../Schema/FabricExportDetail');

const FabricWarehouse = require('../../Schema/FabricWarehouse');
const FabricWarehouseTran = require('../../Schema/FabricWarehouseTran');


findImports = (req) => {
    console.log('findImports =>' + JSON.stringify(req));
    return FabricImport.find(req);
}

findImportsDetail = (req) => {
    console.log('findImportsDetail =>' + JSON.stringify(req));
    return FabricImportDetail.find(req).sort({ 'inputdate_no': 'asc' });
}


router.get('/getimports', async (req, res, next) => {
    // req.query.record_status = 'O';
    console.log('params :' + JSON.stringify(req.query));
    let orderids = {};
    let dates = {};

    let qr_import_detail = {};
    let qr_import = {};

    if (req.query.order_from) { orderids.$gte = parseInt(req.query.order_from); }
    if (req.query.order_to) { orderids.$lte = parseInt(req.query.order_to); }
    if (!_.isEmpty(orderids)) { qr_import_detail['orderid'] = orderids; }
    //console.log('Tới day 4');

    //console.log('Tới day 1');
    if (req.query.fabric_color) {
        if (req.query.fabric_color.length != 0) { qr_import_detail['fabric_color'] = req.query.fabric_color; }
        delete req.query.fabric_color;
    }
    //console.log('Tới day 2');

    if (req.query.fabric_type) {
        if (req.query.fabric_type.length != 0) { qr_import_detail['fabric_type'] = req.query.fabric_type; }
        delete req.query.fabric_type;
    }
    //console.log('Tới day 3');

    if (req.query.from_date) {
        let fdate = new Date(req.query.from_date);
        dates.$gte = fdate;

        delete req.query.from_date;
    }

    if (req.query.to_date) {
        let fdate = new Date(req.query.to_date);
        dates.$lt = fdate;
        delete req.query.to_date;
    }
    //console.log('Tới day 0');

    if (req.query.provider_name) {
        if (req.query.provider_name.length !== 0) { qr_import.provider_name = req.query.provider_name; }
    }

    if (!_.isEmpty(dates)) { qr_import.inputdate_no = dates; }
    //console.log('Tới day 5');

    let data_imports = {};
    let data_imports_detail = {};

    if (!_.isEmpty(qr_import) && !_.isEmpty(qr_import_detail)) {
        qr_import.record_status = 'O';
        qr_import_detail.record_status = 'O';
        //console.log('qr_import =>' + JSON.stringify(qr_import));
        //console.log(' & qr_import_detail =>' + JSON.stringify(qr_import_detail));
        data_imports = await findImports(qr_import);
        data_imports_detail = await findImportsDetail(qr_import_detail);

    } else {
        if (!_.isEmpty(qr_import)) {
            qr_import.record_status = 'O';
            // console.log('only qr_import =>' + JSON.stringify(qr_import));
            data_imports = await findImports(qr_import);

            let data_ids = [];
            for (let i = 0; i < data_imports.length; i++) {
                if (data_ids.indexOf(data_imports[i]._id) === -1) {
                    data_ids.push(data_imports[i]._id);
                }
            }
            data_imports_detail = await findImportsDetail({ importid: { $in: data_ids }, record_status: 'O' });

        } else if (!_.isEmpty(qr_import_detail)) {
            qr_import_detail.record_status = 'O';
            //console.log('only qr_import_detail =>' + JSON.stringify(qr_import_detail));
            data_imports_detail = await findImportsDetail(qr_import_detail);

            let data_ids = [];
            for (let i = 0; i < data_imports_detail.length; i++) {
                if (data_ids.indexOf(data_imports_detail[i].importid) === -1) {
                    data_ids.push(data_imports_detail[i].importid);
                }
            }
            data_imports = await findImports({ _id: { $in: data_ids }, record_status: 'O' });
        }
    }

    //console.log('data_imports => ' + JSON.stringify(data_imports));
    //console.log('data_imports_detail =>' + JSON.stringify(data_imports_detail));

    //filter 
    let data_return = [];
    for (let i = 0; i < data_imports.length; i++) {
        let details = [];

        for (let j = 0; j < data_imports_detail.length; j++) {
            //console.log('data_imports =' + data_imports[i].id.toString() + '<==> ' + data_imports_detail[j].importid + '--> ' + (data_imports[i].id.toString() === data_imports_detail[j].importid));
            if (data_imports[i].id.toString() === data_imports_detail[j].importid) {
                details.push(data_imports_detail[j]);
            }
        }

        if (details.length > 0) {
            data_imports[i].details = details;
            data_return.push(data_imports[i]);
        }

    }

    console.log('data_return ==>' + JSON.stringify(data_return));
    return res.status(200).send(data_return);

    //console.log(JSON.stringify(req.query));
    //let details = { '$elemMatch': { orderid: orderids } };
    /*
        console.log('orderids==>' + JSON.stringify(details));
        FabricImport.where({
            'details': details
        }).select({ 'details': details, 'provider_name': '*', 'create_date': '*', 'declare_no': '*', 'invoice_no': '*', 'declare_date': '*' })
            .exec((err, fabricwarehouse) => {
                console.log('err = ' + err);
                if (!err) {
                    return res.status(200).send(fabricwarehouse);
                }
                return res.status(500).send(err);
            });*/
    /*
FabricImport.find(req.query)
.exec((err, fabricwarehouse) => {
    console.log('err = ' + err);
    if (!err) {

        // filter data

        return res.status(200).send(fabricwarehouse);
    }
    return res.status(500).send(err);
})*/
});


findExports = (req) => {
    console.log('findExports =>' + JSON.stringify(req));
    return FabricExport.find(req);
}

findExportsDetail = (req) => {
    console.log('findExportsDetail =>' + JSON.stringify(req));
    return FabricExportDetail.find(req).sort({ 'inputdate_no': 'asc' });
}


router.get('/getexports', async (req, res, next) => {
    //req.query.record_status = 'O';
    //console.log('req.query -->' + JSON.stringify(req.query));
    let orderids = {};
    let dates = {};

    let qr_import_detail = {};
    let qr_import = {};

    if (req.query.order_from) { orderids.$gte = parseInt(req.query.order_from); }
    if (req.query.order_to) { orderids.$lte = parseInt(req.query.order_to); }
    if (!_.isEmpty(orderids)) { qr_import_detail['orderid'] = orderids; }
    //console.log('Tới day 4');

    //console.log('Tới day 1');
    if (req.query.fabric_color) {
        if (req.query.fabric_color.length != 0) { qr_import_detail['fabric_color'] = req.query.fabric_color; }
        delete req.query.fabric_color;
    }
    //console.log('Tới day 2');

    if (req.query.fabric_type) {
        if (req.query.fabric_type.length != 0) { qr_import_detail['fabric_type'] = req.query.fabric_type; }
        delete req.query.fabric_type;
    }
    //console.log('Tới day 3');

    if (req.query.from_date) {
        let fdate = new Date(req.query.from_date);
        dates.$gte = fdate;

        delete req.query.from_date;
    }

    if (req.query.to_date) {
        let fdate = new Date(req.query.to_date);
        dates.$lt = fdate;
        delete req.query.to_date;
    }
    //console.log('Tới day 0');

    if (req.query.provider_name) {
        if (req.query.provider_name.length !== 0) { qr_import.provider_name = req.query.provider_name; }
    }

    if (!_.isEmpty(dates)) { qr_import.inputdate_no = dates; }
    //console.log('Tới day 5');

    let data_imports = {};
    let data_imports_detail = {};

    if (!_.isEmpty(qr_import) && !_.isEmpty(qr_import_detail)) {
        qr_import.record_status = 'O';
        qr_import_detail.record_status = 'O';
        //console.log('qr_import =>' + JSON.stringify(qr_import));
        //console.log(' & qr_import_detail =>' + JSON.stringify(qr_import_detail));
        data_imports = await findExports(qr_import);
        data_imports_detail = await findExportsDetail(qr_import_detail);
    } else {
        if (!_.isEmpty(qr_import)) {
            qr_import.record_status = 'O';
            // console.log('only qr_import =>' + JSON.stringify(qr_import));
            data_imports = await findExports(qr_import);

            let data_ids = [];
            for (let i = 0; i < data_imports.length; i++) {
                if (data_ids.indexOf(data_imports[i]._id) === -1) {
                    data_ids.push(data_imports[i]._id);
                }
            }
            data_imports_detail = await findExportsDetail({ exportid: { $in: data_ids }, record_status: 'O' });
            console.log('data_exports_detail==>' + JSON.stringify(data_imports_detail));
        } else if (!_.isEmpty(qr_import_detail)) {
            qr_import_detail.record_status = 'O';
            //console.log('only qr_import_detail =>' + JSON.stringify(qr_import_detail));
            data_imports_detail = await findExportsDetail(qr_import_detail);

            let data_ids = [];
            for (let i = 0; i < data_imports_detail.length; i++) {
                if (data_ids.indexOf(data_imports_detail[i].exportid) === -1) {
                    data_ids.push(data_imports_detail[i].exportid);
                }
            }
            data_imports = await findExports({ _id: { $in: data_ids }, record_status: 'O' });
        }

    }

    //filter 
    let data_return = [];
    for (let i = 0; i < data_imports.length; i++) {
        let details = [];

        for (let j = 0; j < data_imports_detail.length; j++) {
            //console.log('data_imports =' + data_imports[i].id.toString() + '<==> ' + data_imports_detail[j].importid + '--> ' + (data_imports[i].id.toString() === data_imports_detail[j].importid));
            if (data_imports[i].id.toString() === data_imports_detail[j].exportid) {
                details.push(data_imports_detail[j]);
            }
        }

        if (details.length > 0) {
            data_imports[i].details = details;
            data_return.push(data_imports[i]);
        }

    }

    console.log('data_return ==>' + JSON.stringify(data_return));
    return res.status(200).send(data_return);
    /*
        FabricExport.find(req.query)
            .exec((err, fabricwarehouse) => {
    
    
                
    
    
                console.log('err = ' + err);
                if (!err) {
                    console.log(JSON.stringify(fabricwarehouse));
                    return res.status(200).send(fabricwarehouse);
                }
                return res.status(500).send(err);
            })*/
});


router.get('/getinventorys', async (req, res, next) => {
    req.query.record_status = 'O';
    console.log('req.query -->' + JSON.stringify(req.query)); 

    

    FabricWarehouse.find(req.query)
        .sort({ 'fabric_type': 'asc', 'fabric_color': 'asc' })
        .exec((err, inventorys) => {
            if (!err) {
                console.log(inventorys);
                return res.status(200).send(inventorys);
            }
            return res.status(500).send(err);
        })
});

module.exports = router;