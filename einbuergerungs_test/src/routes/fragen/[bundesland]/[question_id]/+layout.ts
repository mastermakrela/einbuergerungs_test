import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = false;

export const load = (async ({ params, parent }) => {
	const { questions } = await parent();
	const { question_id } = params;

	const question = questions.find((e) => e.id === parseInt(question_id));

	if (!question) {
		error(404, 'Frage nicht gefunden');
	}

	return {
		question,
		selected_answer: undefined as number | undefined
	};
}) satisfies LayoutLoad;
