const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idorder: [
		{ type: mongoose.Schema.ObjectId, ref: 'orders' }
	],
    idtournament: [
		{ type: mongoose.Schema.ObjectId, ref: 'tournaments' }
	],
    idcustomer: [
		{ type: mongoose.Schema.ObjectId, ref: 'customers' }
	],    column1: { type: Number, required: true },
    column2: { type: Number, required: true },
    column3: { type: Number, required: true },
    column4: { type: Number, required: true },
    column5: { type: Number, required: true },
    column6: { type: Number, required: true },
    column7: { type: Number, required: true },
    column8: { type: Number, required: true },
    column9: { type: Number, required: true },
    column10: { type: Number, required: true },
    column11: { type: Number, required: true },
    column12: { type: Number, required: true },
    column13: { type: Number, required: true },
    column14: { type: Number, required: true },
    column15: { type: Number, required: true },
    column16: { type: Number, required: true },
    column17: { type: Number, required: true },
    column18: { type: Number, required: true },
    column19: { type: Number, required: true },
    column20: { type: Number, required: true },
    column21: { type: Number, required: true },
    column22: { type: Number, required: true },
    column23: { type: Number, required: true },
    column24: { type: Number, required: true },
    column25: { type: Number, required: true },
    column26: { type: Number, required: true },
    column27: { type: Number, required: true },
    columnres1: { type: Number, default: 0 },
    columnres2: { type: Number, default: 0 },
    columnres3: { type: Number, default: 0 },
    columnres4: { type: Number, default: 0 },
    columnres5: { type: Number, default: 0 },
    columnres6: { type: Number, default: 0 },
    columnres7: { type: Number, default: 0 },
    columnres8: { type: Number, default: 0 },
    columnres9: { type: Number, default: 0 },
    columnres10: { type: Number, default: 0 },
    columnres11: { type: Number, default: 0 },
    columnres12: { type: Number, default: 0 },
    columnres13: { type: Number, default: 0 },
    columnres14: { type: Number, default: 0 },
    columnres15: { type: Number, default: 0 },
    columnres16: { type: Number, default: 0 },
    columnres17: { type: Number, default: 0 },
    columnres18: { type: Number, default: 0 },
    columnres19: { type: Number, default: 0 },
    columnres20: { type: Number, default: 0 },
    columnres21: { type: Number, default: 0 },
    columnres22: { type: Number, default: 0 },
    columnres23: { type: Number, default: 0 },
    columnres24: { type: Number, default: 0 },
    columnres25: { type: Number, default: 0 },
    columnres26: { type: Number, default: 0 },
    columnres27: { type: Number, default: 0 },
    columnwon0: { type: Number, default: 0 },
    columnwon1: { type: Number, default: 0 },
    columnwon2: { type: Number, default: 0 },
    columnwon3: { type: Number, default: 0 },
    columnwon4: { type: Number, default: 0 },
    columnwon5: { type: Number, default: 0 },
    status: { type: String, default: 1 },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('tickets', schema);