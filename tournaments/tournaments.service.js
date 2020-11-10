const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tournament = db.tournament;
const Order = db.orders;
const Tournamentprizerange = db.tournamentprizerange;
const mongoose = require('mongoose');



module.exports = {
    getAll,
    getAllAdmin,
    getAllbyId,
    getById,
    create,
    update,
    delete: _delete
};




async function getAll() {
	var obj = {};
	const ObjectId = mongoose.Types.ObjectId;
	var res = await  Tournament.aggregate([
	//  { $match : { idcustomer :ObjectId(idt) } },
     
     {
        "$project": {
          "_id": 1,
          "amount": 1,
          "multipletickets": 1,
          "seconds": 1,
          "name": 1,
          "ticketprice": 1,
          "startdate": 1,
          "registrationenddate": 1,
          "tournamentenddate": 1,
          "createdDate": 1
         } 
      }
]);
	obj['error']=false;
	obj['tournaments']= res; 
	return obj;
}
async function getAllAdmin() {
	var obj = {};
	const ObjectId = mongoose.Types.ObjectId;
	var res = await  Tournament.aggregate([
	//  { $match : { idcustomer :ObjectId(idt) } },
      { 
		"$lookup":{
            "from": "orders",
            "localField": "_id",
            "foreignField":"idtournament",
            "as": "orders"
        }
	 },  
	 { 
		"$lookup":{
            "from": "tickets",
            "localField": "_id",
            "foreignField":"idtournament",
            "as": "tickets"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "amount": 1,
          "multipletickets": 1,
          "seconds": 1,
          "name": 1,
          "totaltickets": 1,
          "ticketprice": 1,
          "startdate": 1,
          "registrationenddate": 1,
          "tournamentenddate": 1,
          "createdDate": 1,
          "orders.numberoftickets": 1,
          "tickets._id": 1
         } 
      }
]);
	obj['error']=false;
	obj['tournaments']= res; 
	return obj;
}

async function getAllbyId(userParam) {
	var obj = {};
	var oldDateObj = new Date();
	var newDateObj = new Date();
	newDateObj.setTime(oldDateObj.getTime() - (45 * 60 * 1000));
console.log(newDateObj)
	const ObjectId = mongoose.Types.ObjectId;
	var idc = userParam.idcustomer;

	var res = await  Tournament.aggregate([
	//  { $match : { idcustomer :ObjectId(idt) } },
	//	{ $match : { startdate : { $gt: newDateObj }} },
		{ $sort: { createdDate: -1 } },

      { 
		"$lookup":{
            "from": "tournamentprizeranges",
            "localField": "_id",
            "foreignField":"idtournament",
            "as": "tournamentprizeranges"
        }
	 },
      {
        "$project": {
          "_id": 1,
          "amount": 1,
          "multipletickets": 1,
          "seconds": 1,
          "name": 1,
          "ticketprice": 1,
          "startdate": 1,
          "registrationenddate": 1,
          "tournamentenddate": 1,
          "createdDate": 1,
          "status": 1,
          "tournamentprizeranges.idprizetype": 1,
          "tournamentprizeranges.fromrange": 1,
          "tournamentprizeranges.torange": 1,
          "tournamentprizeranges.value": 1
         } 
      }
]);
var tourneysCount =res.length;
for(let k=0; k <tourneysCount ; k++){
		var tourneyid = res[k]._id;
		const orderbefore = await Order.find({ idtournament: tourneyid, idcustomer:idc});
		if(orderbefore){
			res[k].orders=orderbefore;
		}else{
			res[k].orders={};
		}
		
		
}
console.log('s',res)
	obj['error']=false;
	obj['tournaments']= res; 
	return obj;
}
async function getById(id) {
    return await Tournament.findById(id);
}

async function create(userParam) {
	  	var obj = {};  

    // validate
   		if(await Tournament.findOne({ name: userParam.name })) {
			obj['message']='Tournament already registered';
			obj['error']=true;
		}else{
				const tournament = new Tournament(userParam);
				var arrrandomnumbers = [];
				while(arrrandomnumbers.length < 90){
					var r = Math.floor(Math.random() * 90) + 1;
					if(arrrandomnumbers.indexOf(r) === -1) arrrandomnumbers.push(r);
				}
			tournament.randomnumbers =arrrandomnumbers.join();
			//console.log(arr.join());


			if(await tournament.save()){
				obj['message']='tournament created';
				obj['error']=false;
				obj['tournament']= tournament;
			}else{
				obj['message']='tournament not registered';
				obj['error']=true;
				obj['userParam']= userParam;
			}
		}

    // save tournament
   return obj;
}

async function update(id, userParam) {
	var obj = {}; 
    const tournament = await Tournament.findById(id);

    // validate
    if (!tournament){
		obj['message']='tournament not found';
		obj['error']=true;
	}else{
  
    // copy userParam properties to otp_history
    Object.assign(tournament, userParam);

    await tournament.save();
		obj['message']='tournament created';
		obj['error']=false;
		obj['tournament']= tournament;
	
	}
	 return obj;
}

async function _delete(id) {
    await Tournament.findByIdAndRemove(id);
}