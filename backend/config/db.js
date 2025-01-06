import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
// import Question from './models/Question.js';

dotenv.config();
// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

const connectDB = async () => {
	console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

	try {
		const conn = await mongoose.connect(
			'mongodb+srv://ishaantakrani:6s5HRNGmJiZFmp3J@cluster0.xvfda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
			{
				// useNewUrlParser: true,
				// useUnifiedTopology: true,
			}
		);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (e) {
		console.log('Error: ' + e);
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
		const user = await User.findById(userId); // finds user
		if (!user) {
			console.error('User not found');
			return;
		}

		user.questions.push(question); // adds question to user question list
		const updatedUser = await user.save(); // pushes to db
		// console.log('Updated user:', updatedUser);	// logs user
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
		return user;
		console.log('User details:', user);
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
