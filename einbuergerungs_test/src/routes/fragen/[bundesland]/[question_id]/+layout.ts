import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ params, parent, url }) => {
	const { questions } = await parent();
	const { question_id } = params;

	const question = questions.find((e) => e.id === parseInt(question_id));

	if (!question) {
		error(404, 'Frage nicht gefunden');
	}

	const answer = parseInt(url.searchParams.get('answer') ?? '');

	return {
		question,
		selected_answer: isNaN(answer) ? undefined : answer
	};
}) satisfies LayoutLoad;
