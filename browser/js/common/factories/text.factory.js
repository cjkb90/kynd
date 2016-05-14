app.factory('TextFactory', function($http){
	var TextFactory = {};

	TextFactory.sendMsg = function(){
		$http.post('/api/texts')
		.then(function(res){
			return res.data;
		})
	}

	TextFactory.getMsg = function(msgId){
		$http.get('/api/texts/' + msgId)
		.then(function(res){
			return res.data;
		})
	}

	return TextFactory;
});