'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Sms = mongoose.model('Sms');
var User = mongoose.model('User');
var twilioConfig = require('./../../../../twilioConfig.js')
module.exports = router;

// cfg.accountSid = 'ACb5cd422f4c837e1839a9a24058e7a024';
// cfg.authToken = 'f53c23f563d475d951983d807f8d01e4';
// cfg.sendingNumber = '+18053605963';

router.get('/', function(req,res){
	Sms.find({})
	.then(function(messages){
		res.send(messages);
	});
});

router.get('/getOne/:msgId', function(req,res){
	Sms.find({_id: req.params.msgId})
	.then(function(messages){
		res.send(messages);
	});
});

router.post('/', function(req,res){
	var client = require('twilio')(twilioConfig.accountSid, twilioConfig.authToken);
	//Send an SMS text message
	client.sendMessage({
	    to: req.body.toPhone, // Any number Twilio can deliver to
	    from: twilioConfig.sendingNumber, // A number you bought from Twilio and can use for outbound communication
	    body: 'req.body.body' // body of the SMS message
	}, function(err, responseData) { //this function is executed when a response is received from Twilio

	    if (!err) { // "err" is an error received during the request, if any

	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

	        console.log(responseData.from); // outputs "+14506667788"
	        console.log(responseData.body); // outputs "word to your mother."
	        res.send(responseData)
	    }
	    else{
	    	res.send("ERROR:",err)
	    }
	});

	// var message = new Sms({
	// 	from: req.body.user,
	// 	toPhone: req.body.toPhone,
	// 	body: req.body.body
	// })
	// return message.save()
	// .then(function(msg){
	// 	res.send(msg);
	// });

});

router.get('/create', function(req,res){
	return User.findOne({})
	.then(function(user){
		var someUser = user._id;
		return someUser;
	})
	.then(function(someUser){
		var msg = new Sms({
			from: someUser,
			toPhone: 9194506615,
			body: "Just wanted to say you're great!"
		});
		return msg.save()
	})
	.then(function(message){
		res.send(message);
	});
});

router.get('/deleteAll', function(req, res){
	Sms.find({})
	.remove()
	.exec()
	.then(function(){
		res.send("Deleted all messages")
	});
});