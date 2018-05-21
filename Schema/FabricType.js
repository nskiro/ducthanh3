const mongoose = require('mongoose');
const fabrictype = new mongoose.Schema({
    code: String,
    name: String,
    
    datecreate: Date,
    usercreate:String,
    dateupdate: Date,
    userupdate: String,
    mod: Number
});

module.exports = mongoose.model('fabrictypes', fabrictype);