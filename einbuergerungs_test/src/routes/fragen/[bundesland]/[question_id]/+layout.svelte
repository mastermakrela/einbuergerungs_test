<!-- @migration-task Error while migrating Svelte code: Unexpected token
https://svelte.dev/e/js_parse_error -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ArrowLeft from '#lib/icons/ArrowLeft.svelte';
	import ArrowRight from '#lib/icons/ArrowRight.svelte';

	let { children, data } = $props();
	let { questions, question } = $derived(data);

	let prev_link = $derived(
		resolve('/fragen/[bundesland]/[question_id]', {
			bundesland: data.bundesland,
			question_id: `${question.id - 1}`
		})
	);
	let next_link = $derived(
		resolve('/fragen/[bundesland]/[question_id]', {
			bundesland: data.bundesland,
			question_id: `${question.id + 1}`
		})
	);

	function on_keypress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			if (e.shiftKey) {
				if (question.id <= 1) return;
				goto(prev_link);
			} else {
				if (question.id >= questions.length) return;
				goto(next_link);
			}
		}
	}
</script>

<svelte:document on:keypress={on_keypress} />

{@render children()}

<hr />

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
	{#if question.id > 1}
		<a role="button" href={prev_link}>
			<span style="display: flex; gap: 0.25rem; justify-content: center;">
				<ArrowLeft />
				vorherige Frage
			</span>
			<kbd>Shift + Enter</kbd>
		</a>
	{/if}
	{#if question.id < questions.length}
		<a role="button" href={next_link} style="grid-column: 2;">
			<span style="display: flex; gap: 0.25rem; justify-content: center;">
				nächste Frage
				<ArrowRight />
			</span>
			<kbd>Enter</kbd>
		</a>
	{/if}
</div>
