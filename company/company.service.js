const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Company = db.companies;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
	var obj = {};
    var company = await Company.find();
	obj['error']=false;
	obj['companies']= company;
	return obj;
}

async function getById(id) {
    return await Company.findById(id);
}

async function create(userParam) {
	  	var obj = {};  

    // validate
   		if(await Company.findOne({ name: userParam.name })) {
			obj['message']='Company already registered';
			obj['error']=true;
		}else{
				const company = new Company(userParam);
			    await company.save();

			obj['message']='Company registered';
			obj['error']=false;
			obj['userdetails']= company;
		}

    // save company
   return obj;
}

async function update(id, userParam) {
    const company = await Company.findById(id);

    // validate
    if (!company) throw 'otp not found';
  
    // copy userParam properties to otp_history
    Object.assign(company, userParam);

    await company.save();
}

async function _delete(id) {
    await Company.findByIdAndRemove(id);
}