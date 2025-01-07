import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
// import Question from './models/Question.js';

dotenv.config();
// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

const connectDB = async () => {
	// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (e) {
		console.log('Error connecting to database: ' + e);
		process.exit(1);
	}
};

const createUser = async (userData) => {
	connectDB();
	try {
		const user = new User(userData);
		const savedUser = await user.save();
		return savedUser;
	} catch (error) {
		console.error(`Error creating user: ${error.message}`);
		throw error;
	}
};

const addQuestion = async (userId, question) => {
	connectDB();
	try {
		const user = await User.findById(userId);
		if (!user) {
			console.error('User not found');
			return;
		}

		user.questions.push(question);
		const updatedUser = await user.save();
	} catch (error) {
		console.error('Error adding question:', error);
	}
};

const getUser = async (userId) => {
	connectDB();
	try {
		const user = await User.findById(userId);
		if (!user) {
			console.error('User not found');
			return;
		}
		console.log('User details:', user);
		return user;
	} catch (error) {
		console.error('Error retrieving user:', error);
	}
};

const removeQuestion = async (userId, questionId) => {
	try {
		const user = await User.findById(userId);
		if (!user) throw new Error('User not found');
		user.questions = user.questions.filter(
			(question) => question._id.toString() !== questionId
		);
		const updatedUser = await user.save();
		return updatedUser;
	} catch (error) {
		console.error(`Error removing question: ${error.message}`);
		throw error;
	}
};

export { connectDB, createUser, getUser, addQuestion, removeQuestion };

// createUser({
// 	username: 'john_doe',
// 	email: 'john@example.com',
// 	password: 'securepassword',
// 	questions: [
// 		// { name: 'Question 1', description: 'This is the first question' },
// 		// { name: 'Question 2', description: 'This is the second question' },
// 	],
// });

// addQuestion('677ad56f899c8afa42eb9244', {
// 	name: '1.4',
// 	description: 'This is another question',
// });

// try {
// 	const user = await getUserWithQuestions('677ad56f899c8afa42eb9244');
// 	console.log(`USER: ${user}\n`);
// 	console.log(`typeof(USER): ${typeof user}`);
// } catch (error) {
// 	console.log(error);
// }

// removeQuestionFromUser('677ad56f899c8afa42eb9244', '677ad5bc7940b435a816c8d6');

// try {
// 	const user = await getUserWithQuestions('677ad56f899c8afa42eb9244');
// 	console.log(`USER: ${user}\n`);
// 	console.log(`typeof(USER): ${typeof user}`);
// } catch (error) {
// 	console.log(error);
// }
