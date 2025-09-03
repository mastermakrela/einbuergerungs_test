import questions from '$lib/nrw_questions.json';
import type { LayoutServerLoad } from './$types';

export const prerender = true;
export const ssr = false;

type Questions = typeof questions;

export const load = (async () => {
	const bundeslands = questions.map((e) => e.name);

	const _questions = questions.reduce(
		(acc, e) => {
			acc[e.name] = e;
			return acc;
		},
		{} as Record<string, Questions[number]>
	);

	return {
		bundeslands,
		questions: _questions
	};
}) satisfies LayoutServerLoad;
