import questions from '$lib/nrw_questions.json';

export const prerender = false;

export const entries = () => {
	return questions.map((bundesland) => ({ bundesland: bundesland.name }));
};
