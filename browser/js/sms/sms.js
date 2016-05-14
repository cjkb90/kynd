'use strict';

app.config(function($stateProvider){
	$stateProvider.state('sms', {
		url: '/sms',
		templateUrl: 'js/sms/sms.html',
		controller: 'SmsController'
	});
});

app.controller('SmsController', function($scope, SmsFactory){
	$scope.logger = function(){
		console.log($scope.sms)

		//SmsFactory.logMe();
	}
});