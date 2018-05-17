const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const _ = require('lodash');

const productionPlanning = require('../Schema/ProductionPlanning');

router.post('/planning',(req, res, next) => {
    if (!req.files)
        return res.status(500).send('No files were uploaded');
    const sampleFile = req.files.planningFile;
    const fileNameArr = sampleFile.name.split('-');
    const filePath = `./upload/file/plan/${fileNameArr[0]}/${sampleFile.name}`;
    sampleFile.mv(filePath, function(err) {
        if (err)
            switch(typeof err){
                case 'object':
                    res.status(500).send(err.code);
                    break;
                default:
                    res.status(500).send(err);
                    break;
            }
        else{
            /*const workbook = XLSX.readFile(filePath);
            const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(first_worksheet);
            const newData = data.map((obj) => {
                return _.mapKeys(obj, (v, k) => _.camelCase(k));
            });
            switch(fileNameArr[0]){
                case 'P':
                    productionPlanning.create(newData,(err,planning)=>{
                        if (err) return res.status(500).send(err.message);
                        res.status(200).send("File was uploaded and inserted to database successfully");
                    });
                    break;
            }*/
            res.status(200).send("File was uploaded successfully");
        }
    });
});

router.post('/qa',(req,res,next)=>{
    if (!req.files)
        return res.status(500).send('No files were uploaded');
    const sampleFile = req.files.qaFile;
    const fileNameArr = sampleFile.name.split("-");
    let filePath = '';
    if(fileNameArr[0] === 'QC1' || fileNameArr[0] === 'QC2'){
        filePath = `./upload/file/qaqc/${fileNameArr[0]}/${fileNameArr[1]}/${sampleFile.name}`;
    }
    else{
        filePath = `./upload/file/qaqc/${fileNameArr[0]}/${sampleFile.name}`;
    }
    sampleFile.mv(filePath, function(err) {
        if (err)
            switch(typeof err){
                case 'object':
                    res.status(500).send(err.code);
                    break;
                default:
                    res.status(500).send(err);
                    break;
            }
        else{
            //const headerArr = ['POIssued','ShipBy','Order','PO','Line','Destination','SKU','Description','HangTheu','OrderQty','FactoryQty','OriginalDueDate','ExFTYDate','EbExFTYDate','EbFactoryQty','LetterReleaseDate','BookingSentDate','BookingConfirmationDate','ETDFactory','ETDVietNam','BOLDate','ETADate','XContainer','ContainerNum','VnInvoice','SERIALNUMBER','CARTONS','FactoryNotes','ErgobabyNotes','ProductGroup','TYPE','Country','Factory','PackingInstruction','TotalFabricStatus','VaiChinh','DMVaiChinh','SLVaiChinh','TTVaiChinh','VaiLot','DMVaiLot','SLVaiLot','TTVaiLot','VaiVien','DMVaiVien','SLVaiVien','TTVaiVien','LuoiNho','DMLuoiNho','SLLuoiNho','TTLuoiNho','LuoiLon','DMLuoiLon','SLLuoiLon','TTLuoiLon','VaiLot1','DMVaiLot1','SLVaiLot1','TTVaiLot1','VaiLot2','DMVaiLot2','SLVaiLot2','TTVaiLot2','VaiLot3','DMVaiLot3','SLVaiLot3','TTVaiLot3','VaiLot4','DMVaiLot4','SLVaiLot4','TTVaiLot4','VaiLot5','DMVaiLot5','SLVaiLot5','TTVaiLot5','Buckle','Nhan','Hop','Nut','PhuLieuKhac'];
            res.status(200).send("File was uploaded successfully");
        }
    });
});

router.post('/marker',(req,res,next)=>{
    if (!req.files)
        return res.status(500).send('No files were uploaded');
    const sampleFile = req.files.markerFile;
    const fileNameArr = sampleFile.name.split("-");
    sampleFile.mv(`./upload/file/marker/${fileNameArr[0]}/${sampleFile.name}`, function(err) {
        if (err)
            switch(typeof err){
                case 'object':
                    res.status(500).send(err.code);
                    break;
                default:
                    res.status(500).send(err);
                    break;
            }
        else{
            //const headerArr = ['POIssued','ShipBy','Order','PO','Line','Destination','SKU','Description','HangTheu','OrderQty','FactoryQty','OriginalDueDate','ExFTYDate','EbExFTYDate','EbFactoryQty','LetterReleaseDate','BookingSentDate','BookingConfirmationDate','ETDFactory','ETDVietNam','BOLDate','ETADate','XContainer','ContainerNum','VnInvoice','SERIALNUMBER','CARTONS','FactoryNotes','ErgobabyNotes','ProductGroup','TYPE','Country','Factory','PackingInstruction','TotalFabricStatus','VaiChinh','DMVaiChinh','SLVaiChinh','TTVaiChinh','VaiLot','DMVaiLot','SLVaiLot','TTVaiLot','VaiVien','DMVaiVien','SLVaiVien','TTVaiVien','LuoiNho','DMLuoiNho','SLLuoiNho','TTLuoiNho','LuoiLon','DMLuoiLon','SLLuoiLon','TTLuoiLon','VaiLot1','DMVaiLot1','SLVaiLot1','TTVaiLot1','VaiLot2','DMVaiLot2','SLVaiLot2','TTVaiLot2','VaiLot3','DMVaiLot3','SLVaiLot3','TTVaiLot3','VaiLot4','DMVaiLot4','SLVaiLot4','TTVaiLot4','VaiLot5','DMVaiLot5','SLVaiLot5','TTVaiLot5','Buckle','Nhan','Hop','Nut','PhuLieuKhac'];
            res.status(200).send("File was uploaded successfully");
        }
    });
});

router.post('/sample',(req,res,next)=>{
    if (!req.files)
        return res.status(500).send('No files were uploaded');
    const sampleFile = req.files.sampleFile;
    const fileNameArr = sampleFile.name.split("-");
    sampleFile.mv(`./upload/file/sample/${fileNameArr[0]}/${sampleFile.name}`, function(err) {
        if (err)
            switch(typeof err){
                case 'object':
                    res.status(500).send(err.code);
                    break;
                default:
                    res.status(500).send(err);
                    break;
            }
        else{
            //const headerArr = ['POIssued','ShipBy','Order','PO','Line','Destination','SKU','Description','HangTheu','OrderQty','FactoryQty','OriginalDueDate','ExFTYDate','EbExFTYDate','EbFactoryQty','LetterReleaseDate','BookingSentDate','BookingConfirmationDate','ETDFactory','ETDVietNam','BOLDate','ETADate','XContainer','ContainerNum','VnInvoice','SERIALNUMBER','CARTONS','FactoryNotes','ErgobabyNotes','ProductGroup','TYPE','Country','Factory','PackingInstruction','TotalFabricStatus','VaiChinh','DMVaiChinh','SLVaiChinh','TTVaiChinh','VaiLot','DMVaiLot','SLVaiLot','TTVaiLot','VaiVien','DMVaiVien','SLVaiVien','TTVaiVien','LuoiNho','DMLuoiNho','SLLuoiNho','TTLuoiNho','LuoiLon','DMLuoiLon','SLLuoiLon','TTLuoiLon','VaiLot1','DMVaiLot1','SLVaiLot1','TTVaiLot1','VaiLot2','DMVaiLot2','SLVaiLot2','TTVaiLot2','VaiLot3','DMVaiLot3','SLVaiLot3','TTVaiLot3','VaiLot4','DMVaiLot4','SLVaiLot4','TTVaiLot4','VaiLot5','DMVaiLot5','SLVaiLot5','TTVaiLot5','Buckle','Nhan','Hop','Nut','PhuLieuKhac'];
            res.status(200).send("File was uploaded successfully");
        }
    });
});

router.post('/production',(req,res,next)=>{
    if (!req.files)
        return res.status(500).send('No files were uploaded');
    const sampleFile = req.files.productionFile;
    const fileNameArr = sampleFile.name.split("-");
    sampleFile.mv(`./upload/file/production/${fileNameArr[0]}/${sampleFile.name}`, function(err) {
        if (err)
            switch(typeof err){
                case 'object':
                    res.status(500).send(err.code);
                    break;
                default:
                    res.status(500).send(err);
                    break;
            }
        else{
            //const headerArr = ['POIssued','ShipBy','Order','PO','Line','Destination','SKU','Description','HangTheu','OrderQty','FactoryQty','OriginalDueDate','ExFTYDate','EbExFTYDate','EbFactoryQty','LetterReleaseDate','BookingSentDate','BookingConfirmationDate','ETDFactory','ETDVietNam','BOLDate','ETADate','XContainer','ContainerNum','VnInvoice','SERIALNUMBER','CARTONS','FactoryNotes','ErgobabyNotes','ProductGroup','TYPE','Country','Factory','PackingInstruction','TotalFabricStatus','VaiChinh','DMVaiChinh','SLVaiChinh','TTVaiChinh','VaiLot','DMVaiLot','SLVaiLot','TTVaiLot','VaiVien','DMVaiVien','SLVaiVien','TTVaiVien','LuoiNho','DMLuoiNho','SLLuoiNho','TTLuoiNho','LuoiLon','DMLuoiLon','SLLuoiLon','TTLuoiLon','VaiLot1','DMVaiLot1','SLVaiLot1','TTVaiLot1','VaiLot2','DMVaiLot2','SLVaiLot2','TTVaiLot2','VaiLot3','DMVaiLot3','SLVaiLot3','TTVaiLot3','VaiLot4','DMVaiLot4','SLVaiLot4','TTVaiLot4','VaiLot5','DMVaiLot5','SLVaiLot5','TTVaiLot5','Buckle','Nhan','Hop','Nut','PhuLieuKhac'];
            res.status(200).send("File was uploaded successfully");
        }
    });
});

router.post('/embroidery',(req,res,next)=>{
    if (!req.files)
        return res.status(500).send('No files were uploaded');
    const sampleFile = req.files.embroideryFile;
    sampleFile.mv(`./upload/file/embroidery/${sampleFile.name}`, function(err) {
        if (err)
            switch(typeof err){
                case 'object':
                    res.status(500).send(err.code);
                    break;
                default:
                    res.status(500).send(err);
                    break;
            }
        else{
            //const headerArr = ['POIssued','ShipBy','Order','PO','Line','Destination','SKU','Description','HangTheu','OrderQty','FactoryQty','OriginalDueDate','ExFTYDate','EbExFTYDate','EbFactoryQty','LetterReleaseDate','BookingSentDate','BookingConfirmationDate','ETDFactory','ETDVietNam','BOLDate','ETADate','XContainer','ContainerNum','VnInvoice','SERIALNUMBER','CARTONS','FactoryNotes','ErgobabyNotes','ProductGroup','TYPE','Country','Factory','PackingInstruction','TotalFabricStatus','VaiChinh','DMVaiChinh','SLVaiChinh','TTVaiChinh','VaiLot','DMVaiLot','SLVaiLot','TTVaiLot','VaiVien','DMVaiVien','SLVaiVien','TTVaiVien','LuoiNho','DMLuoiNho','SLLuoiNho','TTLuoiNho','LuoiLon','DMLuoiLon','SLLuoiLon','TTLuoiLon','VaiLot1','DMVaiLot1','SLVaiLot1','TTVaiLot1','VaiLot2','DMVaiLot2','SLVaiLot2','TTVaiLot2','VaiLot3','DMVaiLot3','SLVaiLot3','TTVaiLot3','VaiLot4','DMVaiLot4','SLVaiLot4','TTVaiLot4','VaiLot5','DMVaiLot5','SLVaiLot5','TTVaiLot5','Buckle','Nhan','Hop','Nut','PhuLieuKhac'];
            res.status(200).send("File was uploaded successfully");
        }
    });
});

router.post('/packaging',(req,res,next)=>{
    if (!req.files)
        return res.status(500).send('No files were uploaded');
    const sampleFile = req.files.packagingFile;
    sampleFile.mv(`./upload/file/packaging/${sampleFile.name}`, function(err) {
        if (err)
            switch(typeof err){
                case 'object':
                    res.status(500).send(err.code);
                    break;
                default:
                    res.status(500).send(err);
                    break;
            }
        else{
            //const headerArr = ['POIssued','ShipBy','Order','PO','Line','Destination','SKU','Description','HangTheu','OrderQty','FactoryQty','OriginalDueDate','ExFTYDate','EbExFTYDate','EbFactoryQty','LetterReleaseDate','BookingSentDate','BookingConfirmationDate','ETDFactory','ETDVietNam','BOLDate','ETADate','XContainer','ContainerNum','VnInvoice','SERIALNUMBER','CARTONS','FactoryNotes','ErgobabyNotes','ProductGroup','TYPE','Country','Factory','PackingInstruction','TotalFabricStatus','VaiChinh','DMVaiChinh','SLVaiChinh','TTVaiChinh','VaiLot','DMVaiLot','SLVaiLot','TTVaiLot','VaiVien','DMVaiVien','SLVaiVien','TTVaiVien','LuoiNho','DMLuoiNho','SLLuoiNho','TTLuoiNho','LuoiLon','DMLuoiLon','SLLuoiLon','TTLuoiLon','VaiLot1','DMVaiLot1','SLVaiLot1','TTVaiLot1','VaiLot2','DMVaiLot2','SLVaiLot2','TTVaiLot2','VaiLot3','DMVaiLot3','SLVaiLot3','TTVaiLot3','VaiLot4','DMVaiLot4','SLVaiLot4','TTVaiLot4','VaiLot5','DMVaiLot5','SLVaiLot5','TTVaiLot5','Buckle','Nhan','Hop','Nut','PhuLieuKhac'];
            res.status(200).send("File was uploaded successfully");
        }
    });
});

module.exports = router;
