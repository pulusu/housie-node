const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idtournament: [
		{ type: mongoose.Schema.ObjectId, ref: 'tournament' }
	],
    idprizetype: { type: String, required: true },
    fromrange: { type: String, default: 1 },
    torange: { type: String, default: 2 },
    value: { type: String, default: 10 },
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

module.exports = mongoose.model('tournamentprizeranges', schema);