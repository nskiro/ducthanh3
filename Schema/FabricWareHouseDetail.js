const mongoose = require('mongoose');
const fabricwarehousedetail = new mongoose.Schema({
   
    orderid: String,
    type: String,
    color: String,
    quantity: Number,
    roll: Number,
    note: String,
    
    datecreate: Date,
    usercreate:String,
    dateupdate: Date,
    userupdate: String,
    mod: Number
});

module.exports = mongoose.model('fabricwarehousedetails', fabricwarehousedetail);
