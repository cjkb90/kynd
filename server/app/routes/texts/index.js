'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');
module.exports = router;


router.get('/', function(req,res){
	Message.find({})
	.then(function(messages){
		res.send(messages);
	});
});

router.post('/', function(req,res){
	var message = new Message({
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
		var msg = new Message({
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
	Message.find({})
	.remove()
	.exec()
	.then(function(){
		res.send("Deleted all messages")
	});
});