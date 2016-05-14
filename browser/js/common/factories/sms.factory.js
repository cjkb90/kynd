app.factory('SmsFactory', function($http){
	

	var SmsFactory = {};

	SmsFactory.sendMsg = function(msg){
		$http.post('/api/sms', msg)
		.then(function(res){
			return res.data;
		})
	}

	SmsFactory.getMsg = function(msgId){
		$http.get('/api/sms/' + msgId)
		.then(function(res){
			return res.data;
		})
	}

	return SmsFactory;
});