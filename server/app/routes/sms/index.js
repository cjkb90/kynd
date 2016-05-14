'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Sms = mongoose.model('Sms');
var User = mongoose.model('User');
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
		from: req.body.user,
		toPhone: req.body.toPhone,
		body: req.body.body
	})
	return message.save()
	.then(function(msg){
		res.send(msg);
	});

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