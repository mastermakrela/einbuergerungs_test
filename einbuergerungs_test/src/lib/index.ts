import questions from '$lib/nrw_questions.json';

export function get_question(bundesland: string, question_id: string) {
	return questions
		.find((e) => e.name === bundesland)
		?.questions.find((e) => e.id === parseInt(question_id));
}
