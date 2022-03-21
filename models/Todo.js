import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var todo = new Schema({
	todo: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	isCompleted: {
		type: Boolean,
		default:false
	},

});

mongoose.models = {};

var Todo = mongoose.model('todo', todo);

export default Todo;
