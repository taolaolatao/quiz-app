import queryString from 'query-string';
import { shuffleArray } from '../utils';

export enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard',
}

export const fetchQuizQuestions = async (
	amount: number,
	difficulty: Difficulty
): Promise<QuestionState[]> => {
	const params = {
		amount: amount,
		difficulty: difficulty,
		type: 'multiple',
	};
	const url = `https://opentdb.com/api.php?${queryString.stringify(params)}`;
	const response = await (await fetch(url)).json();

	return response.results.map((question: Question) => ({
		...question,
		answers: shuffleArray([
			...question.incorrect_answers,
			question.correct_answer,
		]),
	}));
};
