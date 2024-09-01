import questions from '$lib/nrw_questions.json';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return questions.map((e) => ({ bundesland: e.name }));
};

export const prerender = true;
