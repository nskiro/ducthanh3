const mongoose = require('mongoose');
const departmentInfo = new mongoose.Schema({
    avatar: {type : String, default: 'avatar/avatar-placeholder.png'},
    deptName: {type : String, default:""},
    HoD: {type : String, default:""},
    email: {type : String, default:""},
    mobile: {type : String, default:""},
    status: {type: String, default: ""}
});

module.exports = mongoose.model('departmentinfos', departmentInfo);