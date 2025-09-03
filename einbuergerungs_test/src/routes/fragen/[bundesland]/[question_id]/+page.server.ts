import questions from '$lib/nrw_questions.json';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return questions.flatMap((bundesland) => {
		return bundesland.questions.map((question) => ({
			bundesland: bundesland.name,
			question_id: `${question.id}`
		}));
	});
};

export const prerender = false;
