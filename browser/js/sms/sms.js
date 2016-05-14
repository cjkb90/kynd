'use strict';

app.config(function($stateProvider){
	$stateProvider.state('sms', {
		url: '/sms',
		templateUrl: 'js/sms/sms.html',
		controller: 'SmsController'
	});
});

app.controller('SmsController', function($scope, SmsFactory, AuthService){
	$scope.logger = function(){
		console.log($scope.sms)
	}
	$scope.sendMsg = function(msg){
		AuthService.getLoggedInUser()
		.then(function(user){
			msg.from = user._id
		});
		SmsFactory.sendMsg(msg);
	}


});