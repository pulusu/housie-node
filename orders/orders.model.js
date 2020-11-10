const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idtournament: [
		{ type: mongoose.Schema.ObjectId, ref: 'tournaments' }
	],
    idcustomer: [
		{ type: mongoose.Schema.ObjectId, ref: 'customers' }
	],
    amount: { type: String, required: true },
    numberoftickets: { type: Number, default: 1 },
    gameplayed: { type: Number, default: 0 },
    paymentmode: { type: Number, default: 1 },
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

module.exports = mongoose.model('orders', schema);