import React from 'react';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

interface QuestionCardProps {
	question: string;
	answers: string[];
	userAnswer: Answer | undefined;
	questionNum: number;
	totalQuestions: number;
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	question,
	answers,
	userAnswer,
	questionNum,
	totalQuestions,
	callback,
}) => {
	return (
		<Wrapper>
			<p className="question-step">
				Question: {questionNum} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: question }} />
			<div>
				{answers.map((answer, index) => (
					<ButtonWrapper
						key={index}
						correct={userAnswer?.correctAnswer === answer}
						userClicked={userAnswer?.answer === answer}
					>
						<button
							disabled={userAnswer ? true : false}
							value={answer}
							onClick={callback}
						>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</button>
					</ButtonWrapper>
				))}
			</div>
		</Wrapper>
	);
};

export default QuestionCard;
