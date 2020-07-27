import React, { useState } from 'react';
// import './App.css';

// Components
import QuestionCard from './components/QuestionCard';
// API
import { fetchQuizQuestions, Difficulty } from './api/fetchQuiz';
// Style
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
	const [number, setNumber] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [gameOver, setGameOver] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty.EASY
		);
		setQuestions(newQuestions);
		setScore(0);
		setNumber(0);
		setLoading(false);
		setUserAnswers([]);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			const answer = e.currentTarget.value;
			const correct = questions[number].correct_answer === answer;

			if (correct) setScore((prev) => prev + 1);

			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};

	const nextQuestion = () => {
		const nextQuestion = number + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};

	return (
		<>
			<Wrapper className="App">
				<GlobalStyle />
				<h1>React Quiz</h1>
				{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
					<button className="btn-start" onClick={startTrivia}>
						Start
					</button>
				) : null}
				{!gameOver && <p className="score">Score: {score}</p>}
				{loading && <p>Loading Question...</p>}
				{!loading && !gameOver && (
					<QuestionCard
						questionNum={number + 1}
						totalQuestions={TOTAL_QUESTIONS}
						question={questions[number].question}
						answers={questions[number].answers}
						userAnswer={userAnswers ? userAnswers[number] : undefined}
						callback={checkAnswer}
					/>
				)}
				{!loading &&
					!gameOver &&
					userAnswers.length === number + 1 &&
					number !== TOTAL_QUESTIONS - 1 && (
						<button className="btn-next" onClick={nextQuestion}>
							Next Question
						</button>
					)}
			</Wrapper>
		</>
	);
};

export default App;
