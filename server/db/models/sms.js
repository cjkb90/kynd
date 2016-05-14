var mongoose = require('mongoose');

var smsSchema = new mongoose.Schema({
	from: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	toEmail: {type: String},
	toPhone: {type: Number},
	title: {type: String},
	body: {type: String, required: true},
	date: {type: Date, default: Date.now}
});

mongoose.model('Sms', smsSchema);
