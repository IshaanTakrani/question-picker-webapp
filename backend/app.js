import express from 'express';
import { connectDB } from './config/db.js';
import Question from './models/question.model.js';

const app = express();

app.listen(5000, () => {
	console.log('App started at http://localhost:5000');
});

app.get('/', (req, res) => {
	connectDB();
	res.send({ message: 'welcome to server!' });
});

app.post('/questions', async (req, res) => {
	const question = req.body; // This is user-given data
	console.log(req);

	if (!question.number || !question.description) {
		res
			.send(400)
			.json({ success: false, message: 'Please fill in all fields' });
	}
	const newQuestion = new Question(question);

	try {
		await newQuestion.save();
		res.status(201).json({
			success: true,
			message: 'Successfully created object',
		});
	} catch (e) {
		console.error('Error creating product:', e);
		res
			.status(500)
			.json({ success: false, message: 'unable to create Object' });
	}
	// connectDB();
	// TODO: res.send(questions from db)
});
