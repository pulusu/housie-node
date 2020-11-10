exports.ticketGet = (messageObj, callback) => {
	const numbers = [];
	var test = messageObj[0];
	var test1 =test[0];
	var test2 =test[1];
	var test3 =test[2];
		test1.forEach(function(value, index) {
		  numbers[index]=value;
		  console.log(value,index);
		});
		
	return numbers;

}
