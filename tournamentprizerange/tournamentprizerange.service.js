const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tournamentprizerange = db.tournamentprizerange;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
	var obj = {};
    var tournamentprizerange = await Tournamentprizerange.find();
	obj['error']=false;
	obj['companies']= tournamentprizerange;
	return obj;
}

async function getById(id) {
    return await Tournamentprizerange.findById(id);
}

async function create(userParam) {
	  	var obj = {};  

    // validate
		const tournamentprizerange = new Tournamentprizerange(userParam);
   		if(await tournamentprizerange.save()) {
			obj['message']='tournamentprizerange registered';
			obj['error']=false;
		}else{
			obj['message']='tournamentprizerange not registered';
			obj['error']=true;
		}

    // save company
   return obj;
}

async function update(id, userParam) {
    const tournamentprizerange = await Tournamentprizerange.findById(id);

    // validate
    if (!tournamentprizerange) throw 'otp not found';
  
    // copy userParam properties to otp_history
    Object.assign(tournamentprizerange, userParam);

    await tournamentprizerange.save();
}

async function _delete(id) {
    await Tournamentprizerange.findByIdAndRemove(id);
}