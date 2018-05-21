const mongoose = require('mongoose');
const fabricprovider = new mongoose.Schema({
    _id: String,
    provider_code: String,
    provider_name: String,
    create_date: Date
    /*
    datecreate: Date,
    usercreate:String,
    dateupdate: Date,
    userupdate: String,
    mod: Number*/
});

module.exports = mongoose.model('fabricproviders', fabricprovider);
