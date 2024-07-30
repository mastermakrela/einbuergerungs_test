import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { bundeslands, questions } = await parent();
	const { bundesland } = params;

	if (!bundeslands.includes(bundesland)) {
		error(404, 'Bundesland nicht gefunden');
	}

	const _questions = questions[bundesland].questions;

	return {
		bundesland,
		questions: _questions
	};
}) satisfies LayoutLoad;
