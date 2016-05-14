'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Sms = mongoose.model('Sms');
var User = mongoose.model('User');
var twilioConfig = require('./../../../../twilioConfig.js')
module.exports = router;

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
	var message = new Sms({
		from: req.body.from,
		toPhone: req.body.toPhone,
		body: req.body.body
	})
	return message.save()
	.then(function(msg){
		var client = require('twilio')(twilioConfig.accountSid, twilioConfig.authToken);
		//Send an SMS text message
		client.sendMessage({
			to:req.body.toPhone,// Any number Twilio can deliver to
		    from:twilioConfig.sendingNumber,// A number you bought from Twilio and can use for outbound communication
		    body:req.body.body// body of the SMS message
		}, function(err, responseData) { //this function is executed when a response is received from Twilio
			if(!err){
		        // "responseData" is a JavaScript object containing data received from Twilio.
		        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
		        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
		        console.log(responseData);
		    }
		    else{
		    	res.send("ERROR:",err)
		    }
		});
		res.send(msg);
	})
	.catch(function(err){
		res.send("ERROR:", err);
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