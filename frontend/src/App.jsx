import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
	const [quote, setQuote] = useState('Loading...');
	const [count, setCount] = useState(0);

	useEffect(() => {
		// Fetch the quote when the component loads
		fetch('http://localhost:5000/get-quote')
			.then((response) => response.json()) // Convert response to JSON
			.then((data) => setQuote(data.message)) // Update state with the quote
			.catch((error) => setQuote('Error fetching quote')); // Handle errors
	}, []); // Empty array means this runs only once

	// useEffect(() => {
	// 	fetch('http//localhost:5000/get-questions');
	// });

	return (
		<>
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

					<tbody>
						<tr>
							<td>1.3.4</td>
							<td>What is 2+2?</td>
							<td>✅</td>
							<td>❌</td>
						</tr>
					</tbody>
				</table>
				<p>{quote}</p>
			</div>
		</>
	);
};

export default App;

// import React, { useState, useEffect } from 'react';

// const App = () => {
// 	const [quote, setQuote] = useState('Loading...'); // State for the quote

// 	useEffect(() => {
// 		fetch('http://localhost:5000/getQuote')
// 			.then((response) => response.json())
// 			.then((data) => setQuote(data.message))
// 			.catch((error) => setQuote('Error fetching quote'));
// 	}, []); // Empty array means this runs only once

// 	return (
// 		<div>
// 			<h1>Quote:</h1>
// 			<p>{quote}</p>
// 		</div>
// 	);
// };

// export default App;
