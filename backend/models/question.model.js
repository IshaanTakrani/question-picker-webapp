import mongoose, { mongo } from 'mongoose';

const questionSchema = new mongoose.Schema(
	{
		number: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);
export default Question;
