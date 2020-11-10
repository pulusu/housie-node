const fs = require('fs');
const path = require('path');
var template = require('es6-template-strings');
const emailer_marketing = require('../emailhost-marketing');
const config = require('../config/index')

exports.sendOTPEmail = (messageObj, callback) => {
  var blindSchoolEmailTemplate = path.join(__dirname, '/otp-sent.html')
  fs.readFile(blindSchoolEmailTemplate, "utf8", function (error, temp) {
    var message = template(temp, {
      message: messageObj.title

  });
    var ccArr='';
    var subject = "Kairos Hosuie OTP";
    var toArr = [];
    toArr.push(messageObj.email);
    var from=config.fromAdd;
    var bccArr= '';
	console.log('sss',from);
    emailer_marketing.email(toArr, ccArr, bccArr, from, subject, message, function (err, result) {
      callback(err, result);
    })
  })
}
