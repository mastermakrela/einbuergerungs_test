import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load = (async ({ params, parent }) => {
	const { questions } = await parent();
	const { question_id } = params;

	const question = questions.find((e) => e.id === parseInt(question_id));

	if (!question) {
		error(404, 'Frage nicht gefunden');
	}

	// this is for SSR but now we deploy to GH pages
	// const answer = parseInt(url.searchParams.get('answer') ?? '');

	return {
		question,
		selected_answer: undefined as number | undefined // isNaN(answer) ? undefined : answer
	};
}) satisfies LayoutLoad;
