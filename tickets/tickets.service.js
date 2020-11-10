const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const tambola = require('tambola-generator');
const Ticket = db.tickets;

module.exports = {
    getAll,
    getById,
    create,
    updateTicket,
    delete: _delete
};



async function getAll() {
	var obj = {};
    var ticket = await Ticket.find();
	obj['error']=false;
	obj['companies']= ticket;
	return obj;
}

async function getById(id) {
    return await Ticket.findById(id);
}

async function create(userParam) {
	  	var obj = {};  

    // validate
   		if(await Ticket.findOne({ name: userParam.name })) {
			obj['message']='ticket already registered';
			obj['error']=true;
		}else{
				const ticket = new Ticket(userParam);
			    await ticket.save();

			obj['message']='ticket registered';
			obj['error']=false;
			obj['userdetails']= ticket;
		}

    // save ticket
   return obj;
}

async function updateTicket(userParam) {
		var obj = {};  

		// validate
	 const ticket = await Ticket.findById(userParam.id);
	 		 // userParam.splice(userParam,'id');

   		if(!ticket) {
			obj['message']='ticket id not existed';
			obj['error']=true;
		}else{
			delete userParam.id
			Object.assign(ticket, userParam);
			await ticket.save();

			obj['message']='ticket updated';
			obj['error']=false;
			obj['ticketDetails']= userParam;
		}

    // save ticket
   return obj;
}




async function _delete(id) {
    await Ticket.findByIdAndRemove(id);
}