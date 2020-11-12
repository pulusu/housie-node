const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Otp_history = db.otp_history;
const emails = require("../email/index");
var otpGenerator = require('otp-generator')


module.exports = {
    authenticate,
    resendotp,
    forgotPassword,
    sendOTPregister,
    verifyOtp,
    checkOtp,
    getAll,
    getById,
    create,
    update,
    updateProfile,
    createUser,
    delete: _delete
};

async function authenticate(userParam) {
    var obj = {};  
	const user = await User.findOne({ mobile: userParam.mobile });
   	if(user){
		if (user && bcrypt.compareSync(userParam.password, user.hash)) {
			const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
			obj['error']=false;
			obj['message']="successfully logedIn";
			obj['response'] =  {
				...user.toJSON(),
				token
			};
		}else{
			obj['message']='Please enter valid password';
			obj['error']=true;
		}
	}else{
			obj['message']='Please enter valid Mobile';
			obj['error']=true;
	
	}
	//console.log(userParam)
	//console.log(obj)
	return obj;
}
async function resendotp(userParam) {

	var obj = {};  
    // validate
		 await Otp_history.updateMany(
			   { mobile:userParam.mobile, status:0 },
			   {
				 $set: { status: 1 },
				 $currentDate: { lastModified: true }
			   }
			)
		const otp_history = new Otp_history();
		otp_history.mobile = userParam.mobile;
		otp_history.otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, digits:true, numbers:true, alphabets:false });
		var otp_details = await otp_history.save();
		obj['otp_details'] = otp_details;
		obj['message']='OTP sent';

	
    // save user
	return obj;

}
async function forgotPassword(userParam) {
    var obj = {};  
	const user = await User.findOne({ mobile: userParam.mobile });
   	if(user){
		await Otp_history.updateMany(
			   { mobile:userParam.mobile, status:0 },
			   {
				 $set: { status: 1 },
				 $currentDate: { lastModified: true }
			   }
			)
		obj['error']=false; 
		obj['userdetails']= user;
		var otpMsg = otpGenerator.generate(6, {  upperCase: false, specialChars: false, digits:true, numbers:true, alphabets:false });
		var messageObject = { title: otpMsg,  email: user.email }
		emails.sendOTPEmail(messageObject)
		const otp_history = new Otp_history();
		otp_history.mobile = userParam.mobile;
		otp_history.otp = otpMsg;
		var otp_details = await otp_history.save();
		obj['otp_details'] = otp_details;
		obj['message']='OTP sent';
		
	}else{
			obj['message']='Please enter valid Mobile';
			obj['error']=true;
	
	}
	return obj;
}
async function verifyOtp(userParam) {
	var obj = {}; 
	const otp_history = await Otp_history.findOne({ mobile: userParam.mobile,otp: userParam.otp,status: 0 });
	if(otp_history){
		let mobile = userParam.mobile;
		 userParam.status=1;
		 Object.assign(otp_history, userParam);
		 await otp_history.save();
		 await User.updateOne(
			   { mobile:mobile },
			   {
				 $set: { mobile_verified: 1 },
				 $currentDate: { lastModified: true }
			   }
			)
			obj['error']=false;
			obj['message']="OTP verified";
	}else{
		obj['error']=true;
		obj['message']="Enter Valid OTP";
	}
	return obj;
	  
}
async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
  	var obj = {};  
    // validate
	const otp_history = await Otp_history.findOne({ mobile: userParam.mobile,otp: userParam.otp,status: 0 });
	if (otp_history){
		var userOTP=[];
		 userOTP.mobile=userParam.mobile;
		 userOTP.status=1;
		 Object.assign(otp_history, userOTP);
		 await otp_history.save();
		 await User.updateOne(
			   { mobile:userParam.mobile },
			   {
				 $set: { mobile_verified: 1 },
				 $currentDate: { lastModified: true }
			   }
			)
		if(await User.findOne({ mobile: userParam.mobile })) {
			let userdetails = await User.findOne({ mobile: userParam.mobile });
			obj['message']='Mobile number already registered';
			obj['error']=true;
			obj['userdetails']= userdetails;
		}else if(await User.findOne({ email: userParam.email })) {
			let userdetails = await User.findOne({ email: userParam.email });
			obj['message']='Email already registered';
			obj['error']=true;
			obj['userdetails']= userdetails;
		}else{
			const user = new User(userParam);
			if (userParam.password) {
				user.hash = bcrypt.hashSync(userParam.password, 10);
			}
			user.mobile_verified=1;
			let userdetails = await user.save();
			obj['error']=false;
		//	obj['userdetails']= userdetails;
			obj['message']='User Created successfully';

	}
	}
	else{
			obj['message']='Enter Valid OTP';
			obj['error']=true;
	}
    // save user
	return obj;

}
async function sendOTPregister(userParam) {
  	var obj = {};  
    // validate
    if(await User.findOne({ mobile: userParam.mobile })) {
		let userdetails = await User.findOne({ mobile: userParam.mobile });
		obj['message']='Mobile number already registered';
		obj['error']=true;
		obj['userdetails']= userdetails;
    }else if(await User.findOne({ email: userParam.email })) {
			let userdetails = await User.findOne({ email: userParam.email });
			obj['message']='Email already registered';
			obj['error']=true;
			obj['userdetails']= userdetails;
	}else{
		const user = new User(userParam);
		if (userParam.password) {
			user.hash = bcrypt.hashSync(userParam.password, 10);
		}
		//let userdetails = await user.save();
		obj['error']=false;
		obj['userdetails']= userParam;
		var otpMsg = otpGenerator.generate(6, { digits: true, specialChars: false });
		var messageObject = { title: otpMsg,  email: userParam.email }
		emails.sendOTPEmail(messageObject)
		const otp_history = new Otp_history();
		otp_history.mobile = userParam.mobile;
		otp_history.otp = otpMsg;
		var otp_details = await otp_history.save();
		obj['otp_details'] = otp_details;
		obj['message']='OTP sent';

	}
    // save user
	return obj;

}
async function checkOtp(userParam) {
	var obj = {}; 
	const otp_history = await Otp_history.findOne({ mobile: userParam.mobile,otp: userParam.otp,status: 0 });
	if (otp_history){
		let mobile = userParam.mobile;
		 userParam.status=1;
		 Object.assign(otp_history, userParam);
		 await otp_history.save();
		 await User.updateOne(
			   { mobile:mobile },
			   {
				 $set: { mobile_verified: 1 },
				 $currentDate: { lastModified: true }
			   }
			)
		const user = await User.findOne({ mobile:mobile });
					
		if (user) {
			const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
			obj['error']=false;
			obj['message']="OTP verified";
			
		}
	}else{
		obj['error']=true;
		obj['message']="Enter Valid OTP";
	}
	return obj;
	  
}
async function update(userParam) {
	var obj = {}; 

    const user = await User.findOne({ mobile: userParam.mobile});
    if (!user) {
		obj['error']=true;
		obj['message']="Enter Valid Mobile";
    }else{
		// hash password if it was entered
		if (userParam.password) {
			userParam.hash = bcrypt.hashSync(userParam.password, 10);
		}
		// copy userParam properties to user
		Object.assign(user, userParam);
		await user.save();
		obj['error']=false;
		obj['message']="changed password";
	}
	return obj;
}
async function updateProfile(userParam,profileimage) {
	var obj = {}; 
	var id = userParam.id;
	if(id){
    const user = await User.findById(id);
    if (!user) {
		obj['error']=true;
		obj['message']="Enter Valid Mobile";
    }else{
		
		if (profileimage) {
			userParam.profileimage = profileimage.path;
		}
		// hash password if it was entered
		if (userParam.password) {
			userParam.hash = bcrypt.hashSync(userParam.password, 10);
		}
		// copy userParam properties to user
		Object.assign(user, userParam);
		await user.save();
		obj['error']=false;
		obj['message']="updated successfully";
	}
	}else{
		obj['error']=true;
		obj['message']="User id required";
	}
	return obj;
}
async function createUser(userParam,profileimage) {
	var obj = {}; 
	
		const user = new User(userParam);
		if (profileimage) {
			user.profileimage = profileimage.path;
		}
		// hash password if it was entered
		if (userParam.password) {
			user.hash = bcrypt.hashSync(userParam.password, 10);
		}
		// copy userParam properties to user
		
		await user.save();
		obj['error']=false;
		obj['message']="User Created successfully";
	
	return obj;
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}