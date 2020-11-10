const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Order = db.orders;
const Ticket = db.tickets;
const Winner = db.winners;
const tambola = require('tambola-generator');
const custom = require("../email/custom-function");
const mongoose = require('mongoose');


module.exports = {
    getAll,
    getById,
    create,
    tiketsByuserTourney,
    tourneyHistoryByTourneyId,
    tourneysHistoryByUser,
    update,
    delete: _delete
};



async function getAll() {
	var obj = {};
    var ticket = await Order.find();
	obj['error']=false;
	obj['companies']= ticket;
	return obj;
}

async function getById(id) {
    return await Order.findById(id);
}
async function tiketsByuserTourney(userParam) {
	var obj = {};
	const ObjectId = mongoose.Types.ObjectId;
	var idt =userParam.idtournament;
	var idc =userParam.idcustomer;
	var res = await  Order.aggregate([
	  { $match : { idtournament :ObjectId(idt) } },
	  { $match : { idcustomer :ObjectId(idc) } },
      { 
		"$lookup":{
            "from": "tickets",
            "localField": "_id",
            "foreignField":"idorder",
            "as": "tickets"
        }
	 },
      { 
		"$lookup":{
            "from": "tournaments",
            "localField": "idtournament",
            "foreignField":"_id",
            "as": "tournament"
        }
	 },
	  {
        "$project": {
          "_id": 1,
          "numberoftickets": 1,
          "gameplayed": 1,
          "amount": 1,
          "idcustomer": 1,
          "idtournament": 1,
          "tickets._id": 1,
          "tickets.column1": 1,
          "tickets.column2": 1,
          "tickets.column3": 1,
          "tickets.column4": 1,
          "tickets.column5": 1,
          "tickets.column6": 1,
          "tickets.column7": 1,
          "tickets.column8": 1,
          "tickets.column9": 1,
          "tickets.column10": 1,
          "tickets.column11": 1,
          "tickets.column12": 1,
          "tickets.column13": 1,
          "tickets.column14": 1,
          "tickets.column15": 1,
          "tickets.column16": 1,
          "tickets.column17": 1,
          "tickets.column18": 1,
          "tickets.column19": 1,
          "tickets.column20": 1,
          "tickets.column21": 1,
          "tickets.column22": 1,
          "tickets.column23": 1,
          "tickets.column24": 1,
          "tickets.column25": 1,
          "tickets.column26": 1,
          "tickets.column27": 1,
          "tickets.columnres1": 1,
          "tickets.columnres2": 1,
          "tickets.columnres3": 1,
          "tickets.columnres4": 1,
          "tickets.columnres5": 1,
          "tickets.columnres6": 1,
          "tickets.columnres7": 1,
          "tickets.columnres8": 1,
          "tickets.columnres9": 1,
          "tickets.columnres10": 1,
          "tickets.columnres11": 1,
          "tickets.columnres12": 1,
          "tickets.columnres13": 1,
          "tickets.columnres14": 1,
          "tickets.columnres15": 1,
          "tickets.columnres16": 1,
          "tickets.columnres17": 1,
          "tickets.columnres18": 1,
          "tickets.columnres19": 1,
          "tickets.columnres20": 1,
          "tickets.columnres21": 1,
          "tickets.columnres22": 1,
          "tickets.columnres23": 1,
          "tickets.columnres24": 1,
          "tickets.columnres25": 1,
          "tickets.columnres26": 1,
          "tickets.columnres27": 1,
          "tickets.columnwon0": 1,
          "tickets.columnwon1": 1,
          "tickets.columnwon2": 1,
          "tickets.columnwon3": 1,
          "tickets.columnwon4": 1,
          "tickets.columnwon5": 1,
          "tournament.id": 1,
          "tournament.seconds": 1,
          "tournament.name": 1,
          "tournament.randomnumbers": 1,
          "tournament.ticketprice": 1,
          "tournament.startdate": 1,
          "tournament.registrationenddate": 1,
          "tournament.tournamentenddate": 1,
          "tournament.fastfivewinners": 1,
          "tournament.fourcornerswinners": 1,
          "tournament.firstrowwinners": 1,
          "tournament.secondrowwinners": 1,
          "tournament.thirdrowwinners": 1,
          "tournament.fullhousewinners": 1,
         } 
      }
]);
	obj['error']=false;
	obj['response']= res; 
	return obj;
}
async function tourneyHistoryByTourneyId(userParam) {
	var obj = {};
	const ObjectId = mongoose.Types.ObjectId;
	var idt =userParam.idtournament;
	var idc =userParam.idcustomer;
	var res = await  Order.aggregate([
	  { $match : { idtournament :ObjectId(idt) } },
	  { $match : { idcustomer :ObjectId(idc) } },
      { 
		"$lookup":{
            "from": "tickets",
            "localField": "_id",
            "foreignField":"idorder",
            "as": "tickets"
        }
	 },
      { 
		"$lookup":{
            "from": "tournaments",
            "localField": "idtournament",
            "foreignField":"_id",
            "as": "tournament"
        }
	 },
	  {
        "$project": {
          "_id": 1,
          "numberoftickets": 1,
          "gameplayed": 1,
          "amount": 1,
          "idcustomer": 1,
          "idtournament": 1,
          "tickets._id": 1,
          "tickets.column1": 1,
          "tickets.column2": 1,
          "tickets.column3": 1,
          "tickets.column4": 1,
          "tickets.column5": 1,
          "tickets.column6": 1,
          "tickets.column7": 1,
          "tickets.column8": 1,
          "tickets.column9": 1,
          "tickets.column10": 1,
          "tickets.column11": 1,
          "tickets.column12": 1,
          "tickets.column13": 1,
          "tickets.column14": 1,
          "tickets.column15": 1,
          "tickets.column16": 1,
          "tickets.column17": 1,
          "tickets.column18": 1,
          "tickets.column19": 1,
          "tickets.column20": 1,
          "tickets.column21": 1,
          "tickets.column22": 1,
          "tickets.column23": 1,
          "tickets.column24": 1,
          "tickets.column25": 1,
          "tickets.column26": 1,
          "tickets.column27": 1,
          "tickets.columnres1": 1,
          "tickets.columnres2": 1,
          "tickets.columnres3": 1,
          "tickets.columnres4": 1,
          "tickets.columnres5": 1,
          "tickets.columnres6": 1,
          "tickets.columnres7": 1,
          "tickets.columnres8": 1,
          "tickets.columnres9": 1,
          "tickets.columnres10": 1,
          "tickets.columnres11": 1,
          "tickets.columnres12": 1,
          "tickets.columnres13": 1,
          "tickets.columnres14": 1,
          "tickets.columnres15": 1,
          "tickets.columnres16": 1,
          "tickets.columnres17": 1,
          "tickets.columnres18": 1,
          "tickets.columnres19": 1,
          "tickets.columnres20": 1,
          "tickets.columnres21": 1,
          "tickets.columnres22": 1,
          "tickets.columnres23": 1,
          "tickets.columnres24": 1,
          "tickets.columnres25": 1,
          "tickets.columnres26": 1,
          "tickets.columnres27": 1,
          "tournament.id": 1,
          "tournament.seconds": 1,
          "tournament.name": 1,
          "tournament.randomnumbers": 1,
          "tournament.ticketprice": 1,
          "tournament.startdate": 1,
          "tournament.registrationenddate": 1,
          "tournament.tournamentenddate": 1,
          "tournament.fastfivewinners": 1,
          "tournament.fourcornerswinners": 1,
          "tournament.firstrowwinners": 1,
          "tournament.secondrowwinners": 1,
          "tournament.thirdrowwinners": 1,
          "tournament.fullhousewinners": 1,
         } 
      }
]);

var ticketcount = res[0].tickets.length;
var prizetypes = [];
prizetypes[0]='FirstRow';
prizetypes[1]='SecondRow';
prizetypes[2]='ThirdRow';
prizetypes[3]='FasrFive';
prizetypes[4]='FourCornrs';
prizetypes[5]='FullHousie';
for(let k=0; k < ticketcount; k++){
		var prizs = {};
	for(let l=0; l<6; l++){
		var ticketid = res[0].tickets[k]._id
		const orderbefore = await Winner.find({ idticket: ticketid, idprizetype:l});
		//res[0].tickets[k].prizetypes[l]= orderbefore;
		console.log(l,ticketid);
		console.log(k,ticketid);
		console.log(prizetypes[l],orderbefore);
		var ssss =prizetypes[l];
		prizs[ssss] = orderbefore;
	}
	
	res[0].tickets[k].prizes = prizs;
	
}
	obj['error']=false;
	obj['response']= res; 
	return obj;
}
async function tourneysHistoryByUser(userParam) {
	var obj = {};
	const ObjectId = mongoose.Types.ObjectId;
	var idc =userParam.idcustomer;
	var res = await  Order.aggregate([
	  { $match : { idcustomer :ObjectId(idc) } },
      
      { 
		"$lookup":{
            "from": "tournaments",
            "localField": "idtournament",
            "foreignField":"_id",
            "as": "tournament"
        }
	 },
	  {
        "$project": {
          "_id": 1,
          "numberoftickets": 1,
          "gameplayed": 1,
          "amount": 1,
          "idcustomer": 1,
          "tournament._id": 1,
          "tournament.seconds": 1,
          "tournament.name": 1,
          "tournament.ticketprice": 1,
          "tournament.startdate": 1,
          "tournament.registrationenddate": 1
          
         } 
      }
]);

	obj['error']=false;
	obj['response']= res; 
	return obj;
}
async function create(userParam) {
	  	var obj = {};  
		
    // validate
		const orderbefore = await Order.findOne({ idcustomer: userParam.idcustomer, idtournament: userParam.idtournament });
		if(!orderbefore){
		const order = new Order(userParam);
		var orderDetails = await order.save();
		if(orderDetails){
			obj['message']='Joined successfully';
			obj['error']=false;
			obj['orderDetails']= orderDetails;
			for (let i = 0; i < userParam.numberoftickets; i++) {
				var final_array1 = [];  
				var final_array2 = [];  
				var final_array3 = [];  
				var messageObj =  tambola.getTickets(1);
					var tiketsallrows = messageObj[0];
					var ticketrow1 =tiketsallrows[0];		
					var ticketrow2 =tiketsallrows[1];		
					var ticketrow3 =tiketsallrows[2];		
					const ticket = new Ticket();
					ticketrow1.forEach(function(value, index) {
						 final_array1[index] =value;
					});
					ticketrow2.forEach(function(value, index) {
						 final_array2[index] =value;
					});
					ticketrow3.forEach(function(value, index) {
						 final_array3[index] =value;
					});
					ticket.idorder=orderDetails.id;
					ticket.idcustomer=userParam.idcustomer;
					ticket.idtournament=userParam.idtournament;
					ticket.column1=final_array1[0];
					ticket.column2=final_array1[1];
					ticket.column3=final_array1[2];
					ticket.column4=final_array1[3];
					ticket.column5=final_array1[4];
					ticket.column6=final_array1[5];
					ticket.column7=final_array1[6];
					ticket.column8=final_array1[7];
					ticket.column9=final_array1[8];
					ticket.column10=final_array2[0];
					ticket.column11=final_array2[1];
					ticket.column12=final_array2[2];
					ticket.column13=final_array2[3];
					ticket.column14=final_array2[4];
					ticket.column15=final_array2[5];
					ticket.column16=final_array2[6];
					ticket.column17=final_array2[7];
					ticket.column18=final_array2[8];
					ticket.column19=final_array3[0];
					ticket.column20=final_array3[1];
					ticket.column21=final_array3[2];
					ticket.column22=final_array3[3];
					ticket.column23=final_array3[4];
					ticket.column24=final_array3[5];
					ticket.column25=final_array3[6];
					ticket.column26=final_array3[7];
					ticket.column27=final_array3[8];
					var ticketDetails =await ticket.save()
			}
			obj['ticketDetails']= ticketDetails;

		}else{
			obj['message']='Oops wrong.';
			obj['error']=true;
		}
		}else{
			obj['orderbefore']=orderbefore;
			obj['error']=false;
			obj['message']='Already joined';

		}
	// save ticket
	
   return obj;
}

async function update(id, userParam) {
    const order = await Order.findById(id);

    // validate
    if (!order) throw 'Order not found';
  
    // copy userParam properties to otp_history
    Object.assign(order, userParam);

    await order.save();
}

async function _delete(id) {
    await Order.findByIdAndRemove(id);
}