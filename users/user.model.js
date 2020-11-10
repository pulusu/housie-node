const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    displayname: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
    company: [
		{ type: mongoose.Schema.ObjectId, ref: 'companies' }
	],
	mobile_verified: { type: Number, default: 0 },
    mobile: { type: String, unique: true, required: true },
    gender: { type: String},
    country: { type: String},
    state: { type: String},
    city: { type: String},
    address: { type: String},
    pincode: { type: String},
    profileimage: { type: String},
	user_type: { type: Number, default: 1 },
    dob: { type: Date },
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

module.exports = mongoose.model('customers', schema);