import questions from '$lib/nrw_questions.json';

export const prerender = true;

export const entries = () => {
	const entries = [];
	for (const bundesland of questions) {
		for (const question of bundesland.questions) {
			entries.push({ bundesland: bundesland.name, question_id: question.id.toString() });
		}
	}
	return entries;
};
