const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    rules: { type: String },
    seconds: { type: Number, required: true, default: 2700 },
    startdate: { type: Date, required: true },
    createdby: { type: String },
    status: { type: String, default: 1 },
    prizetype: { type: String, default: 2},
    fastfivewinners: { type: String, default: 1 },
    fastprizevalue: { type: String, default: 10 },
    fourcornerswinners: { type: String, default: 1 },
    fourcornersvalue: { type: String, default: 10 },
    firstrowwinners: { type: String, default: 1 },
    firstrowvalue: { type: String, default: 10 },
    secondrowwinners: { type: String, default: 1 },
    secondrowvalue: { type: String, default: 10 },
    thirdrowwinners: { type: String, default: 1 },
    thirdrowvalue: { type: String, default: 10 },
    fullhousewinners: { type: String, default: 1 },
    fullhousevalue: { type: String, default: 10 },
    multipletickets: { type: String, default: 1 },
    randomnumbers: { type: String },
    ticketprice: { type: String, default: 1 },
    donation: { type: String, default: 1 },
    totaltickets: { type: Number, default: 1 },
    filledtickets: { type: String, default: 1 },
    tournamenttype: { type: String, default: 3 },
    amount: { type: String, default: 60 },
    donationtext: { type: String, default: 'test' },
    confirm: { type: String, default: 1 },
    registrationenddate: { type: Date },
    tournamentenddate: { type: Date },
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

module.exports = mongoose.model('tournaments', schema);