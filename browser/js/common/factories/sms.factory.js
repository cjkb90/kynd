app.factory('SmsFactory', function($http){
	

	var SmsFactory = {};

	SmsFactory.sendMsg = function(){
		$http.post('/api/texts')
		.then(function(res){
			return res.data;
		})
	}

	SmsFactory.getMsg = function(msgId){
		$http.get('/api/texts/' + msgId)
		.then(function(res){
			return res.data;
		})
	}

	SmsFactory.logMe = function(){
		console.log("Hi, the settings are:")
	}

	return SmsFactory;
});