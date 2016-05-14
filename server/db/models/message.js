var mongoose = require('mongoose');

var messageSchema = new mongoose.schema({
	from: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	toEmail: {type: String},
	toPhone: {type: Number},
	body: {type: String, required: true}
	date: {type: Date, default: Date.now}
});

mongoose.model('Message', messageSchema);
