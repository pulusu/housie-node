const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idtournament: [
		{ type: mongoose.Schema.ObjectId, ref: 'tournaments', required: true }
	],
    idticket: [
		{ type: mongoose.Schema.ObjectId, ref: 'tickets', required: true }
	],
    idcustomer: [
		{ type: mongoose.Schema.ObjectId, ref: 'customers', required: true }
	],
    idprizetype: { type: Number, required: true },
    amount: { type: String },
    rank: { type: Number, default: 1 },
    status: { type: Number, default: 1 },
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

module.exports = mongoose.model('winners', schema);