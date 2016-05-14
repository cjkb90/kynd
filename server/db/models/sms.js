var mongoose = require('mongoose');

var smsSchema = new mongoose.Schema({
	from: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	toEmail: {type: String},
	toPhone: {type: String},
	title: {type: String},
	body: {type: String, required: true},
	date: {type: Date, default: Date.now}
});

var badWords = [ 'hate', 'fuck', 'shit'];
smsSchema.pre('save', function(next) {
   var bodyWords = this.body.split(' ');
   var offensive;
   for (var i=0; i<bodyWords.length; i++){
   	if (offensive){
   		break;
   	}
   	for (var j=0; j<badWords.length; j++){
   		if (bodyWords[i]===badWords[j]){
   			offensive = true;
   			break;
   		}
   	}
   }
   if (offensive){
   	next(new Error("That's not a very kynd message!"));
   }
   else{
   	next()
   }
});

mongoose.model('Sms', smsSchema);
