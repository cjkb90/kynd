'use strict';

app.config(function($stateProvider){
	$stateProvider.state('sms', {
		url: '/sms',
		templateUrl: 'js/sms/sms.html'
	})
})

app.controller('TextController', function($scope, TextFactory){

});