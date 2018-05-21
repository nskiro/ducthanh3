const mongoose = require('mongoose');
const fabriccolor = new mongoose.Schema({
    code: String,
    name: String,

    datecreate: Date,
    usercreate:String,
    dateupdate: Date,
    userupdate: String,
    mod: Number
});

module.exports = mongoose.model('fabriccolors', fabriccolor);
