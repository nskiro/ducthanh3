const mongoose = require('mongoose');
const fabricprovider = new mongoose.Schema({
    provider_code: String,
    provider_name: String,
    create_date: { type: String, default: null } ,
    update_date: { type: String, default: null }
    /*
    datecreate: Date,
    usercreate:String,
    dateupdate: Date,
    userupdate: String,
    mod: Number*/
});
fabricprovider.virtual('id').get(function(){
    return this._id;
});
module.exports = mongoose.model('fabricproviders', fabricprovider);
