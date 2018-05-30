const mongoose = require('mongoose');

const fabricwarehousetran = new mongoose.Schema({
    tran_type_id: String,
    tran_type: { type: String, default: null },
    roll: { type: Number, default: 0 },

    //balance_roll_before: { type: Number, default: 0 },
    roll_after: { type: Number, default: 0 },

    met: { type: Number, default: 0 },
    // balance_met_before: { type: Number, default: 0 },
    met_after: { type: Number, default: 0 },

    create_date: { type: String, default: new Date() },
    update_date: { type: String, default: null },
    record_status: { type: String, default: 'O' }


});

module.exports = mongoose.model('fabricwarehousetrans', fabricwarehousetran);
