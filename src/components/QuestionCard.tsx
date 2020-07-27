import React from 'react';

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
		<div>
			<p className="question-step">
				Question: {questionNum} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: question }} />
			<div>
				{answers.map((answer, index) => (
					<React.Fragment key={index}>
						<button
							disabled={userAnswer ? true : false}
							value={answer}
							onClick={callback}
						>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</button>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default QuestionCard;
