const mongoose = require('mongoose');
const fabricwarehouse = new mongoose.Schema({
    importdate: Date,
    provider: String,
    declaration: String,
    contract: String,

    datecreate: Date,
    usercreate:String,
    dateupdate: Date,
    userupdate: String,
    mod: Number
});

module.exports = mongoose.model('fabricwarehouses', fabricwarehouse);
