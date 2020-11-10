const nodemailer = require('nodemailer');


let transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 486,
    auth: {
        user: '******@gmail.com',
        pass: '******'
    }
});

exports.email=(toArr, ccArr, bccArr, from, subject, msg, callback)=>{
 let message={
     from: from,
     to:toArr,
     cc:ccArr,
     bcc:bccArr.bccArr,
     subject:subject,
     html:msg
    }
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
			console.log(info);
			console.log('bccArr',bccArr);
			console.log('ccArr',ccArr);

        }
    });
}



