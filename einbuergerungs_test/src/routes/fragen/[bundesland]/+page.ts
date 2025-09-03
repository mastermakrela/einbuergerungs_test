import questions from '$lib/nrw_questions.json';

export const prerender = true;

export const entries = () => {
	return questions.map((bundesland) => ({ bundesland: bundesland.name }));
};
