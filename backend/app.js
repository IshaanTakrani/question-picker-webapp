import express from 'express';
import {
	connectDB,
	createUser,
	getUser,
	addQuestion,
	removeQuestion,
} from './config/db.js';
import Question from './models/Question.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(5000, () => {
	console.log('App started at http://localhost:5000');
});

app.get('/get-quote', (req, res) => {
	connectDB();
	res.send({
		message:
			'The sky above the port was the color of television tuned to a dead channel',
	});
});

app.get('/get-questions/:userID', async (req, res) => {
	const { userID } = req.params;
	connectDB();

	try {
		const userData = await getUser(userID);
		if (!userID) {
			res.status(400);
		}
		console.log(userData);

		res.send(userData);
	} catch (e) {
		console.log('Error fetching user data: ', e);
	}
});

// app.post('/questions', async (req, res) => {
// 	const question = req.body; // This is user-given data
// 	console.log(req);

// 	if (!question.number || !question.description) {
// 		res
// 			.send(400)
// 			.json({ success: false, message: 'Please fill in all fields' });
// 	}
// 	const newQuestion = new Question(question);

// 	try {
// 		await newQuestion.save();
// 		res.status(201).json({
// 			success: true,
// 			message: 'Successfully created object',
// 		});
// 	} catch (e) {
// 		console.error('Error creating product:', e);
// 		res
// 			.status(500)
// 			.json({ success: false, message: 'unable to create Object' });
// 	}
// 	// connectDB();
// 	// TODO: res.send(questions from db)
// });
