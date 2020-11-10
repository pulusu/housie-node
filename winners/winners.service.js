const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Winner = db.winners;
const Tournament = db.tournament;
const Ticket = db.tickets;
const mongoose = require('mongoose');

module.exports = {
    getAll,
	prizetype,
    getById,
    winnerslistbyTournament,
    winnersbyTournament,
    create,
    update,
    delete: _delete
    
};



async function getAll() {
	var obj = {};
    var winner = await Winner.find();
	obj['error']=false;
	obj['winners']= winner;
	return obj;
}
async function prizetype() {
	var obj = {};
	obj['error']=false;
	obj['data']={}; 
	obj['data']['firstRow']=0;
	obj['data']['secondRow']=1;
	obj['data']['thirdRow']=2;
	obj['data']['fasrFive']=3;
	obj['data']['fourCorners']=4;
	obj['data']['fullHousie']=5;
	return obj;
}
async function getById(id) {
    return await Winner.findById(id);
}

async function winnerslistbyTournament(userParam) {
	var obj = {};  
	const ObjectId = mongoose.Types.ObjectId;
	var idtournament =userParam.idtournament;
	var firstRow = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(idtournament) } },
	  { $match : { idprizetype :0 } },
 
     { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	var secondRow = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(idtournament) } },
	  { $match : { idprizetype :1 } },
 
     { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);	
	var thirdRow = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(idtournament) } },
	  { $match : { idprizetype :2 } },
 
     { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	
	
	var fastFive = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(userParam.idtournament) } },
	  { $match : { idprizetype : 3 } },
      { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	var fullHousie = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(userParam.idtournament) } },
	  { $match : { idprizetype : 5 } },
      { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	var fourCorners = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(userParam.idtournament) } },
	  { $match : { idprizetype : 4 } },
      { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	
	obj['error']=false;
	obj['winners']={}; 
	obj['winners']['fastFive']= fastFive; 
	obj['winners']['firstRow']= firstRow; 
	obj['winners']['secondRow']= secondRow; 
	obj['winners']['thirdRow']= thirdRow; 
	obj['winners']['fullHousie']= fullHousie; 
	obj['winners']['fourCorners']= fourCorners; 
	return obj;
}
async function winnersbyTournament(userParam) {
	var obj = {};  
	const ObjectId = mongoose.Types.ObjectId;
	var idtournament =userParam.idtournament;
	var firstRow = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(idtournament) } },
	  { $match : { idprizetype :0 } },
 
     { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	var secondRow = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(idtournament) } },
	  { $match : { idprizetype :1 } },
 
     { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);	
	var thirdRow = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(idtournament) } },
	  { $match : { idprizetype :2 } },
 
     { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	
	
	var fastFive = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(userParam.idtournament) } },
	  { $match : { idprizetype : 3 } },
      { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	var fullHousie = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(userParam.idtournament) } },
	  { $match : { idprizetype : 5 } },
      { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	var fourCorners = await  Winner.aggregate([
	  { $match : { idtournament :ObjectId(userParam.idtournament) } },
	  { $match : { idprizetype : 4 } },
      { 
		"$lookup":{
            "from": "customers",
            "localField": "idcustomer",
            "foreignField":"_id",
            "as": "customers"
        }
	 },
     {
        "$project": {
          "_id": 1,
          "idprizetype": 1,
          "rank": 1,
          "tournament.name": 1,
          "customers.name": 1,
          "customers.displayname": 1,
          "customers.mobile": 1,
         } 
      }
	]);
	var t = await Tournament.findById(userParam.idtournament);
	 if((t.fastfivewinners<=fastFive.length) && (t.firstrowwinners <= firstRow.length) && (t.secondrowwinners <= secondRow.length) && (t.thirdrowwinners <= thirdRow.length) && (t.fullhousewinners <= fullHousie.length) && (t.fourcornerswinners <= fourCorners.length)){
		 var gameplaystatus =1;
	 }else{
		 var gameplaystatus =2;
	 }

	
		obj['error']=false;
		obj['winners']={}; 
		obj['outoff']={}; 
		obj['claim_status']={}; 
		obj['winners']['fastFive']= fastFive; 
		obj['outoff']['fastFive']= fastFive.length +'/'+ t.fastfivewinners; 
		obj['winners']['firstRow']= firstRow; 
		obj['outoff']['firstRow']= firstRow.length +'/'+ t.firstrowwinners; 
		obj['winners']['secondRow']= secondRow; 
		obj['outoff']['secondRow']= secondRow.length + '/' +t.secondrowwinners; 
		obj['winners']['thirdRow']= thirdRow; 
		obj['outoff']['thirdRow']=  thirdRow.length +'/'+t.thirdrowwinners; 
		obj['winners']['fullHousie']= fullHousie; 
		obj['outoff']['fullHousie']= fullHousie.length +'/'+ t.fullhousewinners; 
		obj['winners']['fourCorners']= fourCorners; 
		obj['outoff']['fourCorners']= fourCorners.length +'/'+ t.fourcornerswinners; 
		obj['gameplaystatus']= gameplaystatus; 
		
	 if((t.fastfivewinners<=fastFive.length)){
		 obj['claim_status']['fastFive']= 1; 
	 }else{
		  obj['claim_status']['fastFive']= 2; 
	 }
	 if((t.firstrowwinners<=firstRow.length)){
		 obj['claim_status']['firstRow']= 1; 
	 }else{
		  obj['claim_status']['firstRow']= 2; 
	 }
	if((t.secondrowwinners<=secondRow.length)){
		 obj['claim_status']['secondRow']= 1; 
	 }else{
		  obj['claim_status']['secondRow']= 2; 
	 }
	if((t.thirdrowwinners<=thirdRow.length)){
		 obj['claim_status']['thirdRow']= 1; 
	 }else{
		  obj['claim_status']['thirdRow']= 2; 
	 }
	 if((t.fourcornerswinners<=fourCorners.length)){
		 obj['claim_status']['fourCorners']= 1; 
	 }else{
		  obj['claim_status']['fourCorners']= 2; 
	 }
	if((t.fullhousewinners<=fullHousie.length)){
		 obj['claim_status']['fullHousie']= 1; 
	 }else{
		  obj['claim_status']['fullHousie']= 2; 
	 }
	
	return obj;
}

async function create(userParam) {
	  	var obj = {};  
	const ObjectId = mongoose.Types.ObjectId;
	var idtournament =userParam.idtournament;
	var idticket =userParam.idticket;
	var idprizetype =userParam.idprizetype;
	var noofwinners = await Winner.find({ idtournament :ObjectId(idtournament) ,idprizetype:userParam.idprizetype })
    // validate
   		if(await Winner.findOne({ idtournament :ObjectId(idtournament) ,idticket :ObjectId(idticket),idprizetype:userParam.idprizetype })) {
			obj['message']='Winner already created';
			obj['error']=true;
		}else{
				const winner = new Winner(userParam);
				winner.rank=parseInt(noofwinners.length) + 1;
			    await winner.save();
			var column = 'columnwon'+idprizetype
			var ticketParam={};
			ticketParam[column]=1;
			const ticket = await Ticket.findById(idticket);				
			Object.assign(ticket, ticketParam);
			await ticket.save();
			obj['message']='Winner created';
			obj['error']=false;
			obj['userdetails']= winner;
		}

    // save company
   return obj;
}

async function update(id, userParam) {
    const winner = await Winner.findById(id);

    // validate
    if (!winner) throw 'otp not found';
  
    // copy userParam properties to otp_history
    Object.assign(winner, userParam);

    await winner.save();
}

async function _delete(id) {
    await Winner.findByIdAndRemove(id);
}