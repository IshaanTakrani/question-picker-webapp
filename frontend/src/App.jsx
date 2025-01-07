import { useState, useEffect } from 'react';
import './App.css';
// import { removeQuestion } from '../../backend/config/db';

const App = () => {
	const [quote, setQuote] = useState('Loading...');
	const [questions, setQuestions] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		fetch('http://localhost:5000/get-quote')
			.then((response) => response.json())
			.then((data) => setQuote(data.message))
			.catch((error) => setQuote('Error fetching quote'));
	}, []);

	useEffect(() => {
		fetch('http://localhost:5000/get-questions/677ad56f899c8afa42eb9244')
			.then((response) => response.json()) // Convert response to JSON
			.then((data) => setQuestions(data.questions))
			.catch((error) => setQuote('Error fetching quote')); // Handle errors
	}, []);

	const removeQuestionFromTable = (id) => {
		const updatedQuestions = questions.filter(
			(question) => question._id !== id
		);
		setQuestions(updatedQuestions);
	};

	useEffect(() => {
		fetch('http//localhost:5000/get-questions');
	});

	return (
		<>
			<button>Add question</button>
			<p>Questions:</p>
			<div className="table-component">
				<table>
					<thead>
						<tr>
							<th>Question</th>
							<th>Description</th>
							<th>Mark complete</th>
							<th>Delete</th>
						</tr>
					</thead>

					{questions.length > 0 ? (
						questions.map((question) => (
							<tr key={question._id}>
								<td>{question.name}</td>
								<td>{question.description}</td>
								<td>
									<button>Mark complete</button>
								</td>
								<td>
									<button onClick={() => removeQuestionFromTable(question._id)}>
										Remove
									</button>
								</td>
							</tr>
						))
					) : (
						<td colSpan="4">No questions found</td>
					)}
				</table>
				<p>{quote}</p>
			</div>
		</>
	);
};

export default App;
