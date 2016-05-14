'use strict';

app.config(function($stateProvider){
	$stateProvider.state('sms', {
		url: '/sms',
		templateUrl: 'js/sms/sms.html',
		controller: 'SmsController'
	});
});

app.controller('SmsController', function($scope, $state, SmsFactory, AuthService){
	$scope.logger = function(){
		console.log($scope.sms)
	}
	$scope.sendMsg = function(msg){
		AuthService.getLoggedInUser()
		.then(function(user){
			msg.from = user._id
		});
		return SmsFactory.sendMsg(msg)
		.then(function(){
			$state.go('home')
		})
		.catch(function(err){
			window.alert(err.data.err);
			console.log(err);
		});
	}
});