<script lang="ts">
	import { base } from '$app/paths';
	import { Stats } from '$lib/stats.svelte.js';

	let { data } = $props();

	let { questions, question } = $derived(data);

	let selected_answer = $state(data.selected_answer);
	let show_correct = $derived(selected_answer !== undefined);
	$effect(() => {
		selected_answer = data.selected_answer;
	});

	let stats = $derived(Stats.getAnswer(data.bundesland, question.id));

	function on_keypress(e: KeyboardEvent) {
		const _keys = ['a', 's', 'd', 'f'];

		selected_answer = _keys.indexOf(e.key.toLowerCase());
		if (selected_answer === -1) selected_answer = undefined;

		update_answer();
	}

	function update_answer() {
		if (selected_answer !== undefined) {
			const { correct } = question.answers[selected_answer];
			Stats.updateAnswer(data.bundesland, question.id, correct);
		}
	}
</script>

<svelte:document on:keypress={on_keypress} />

<hr />

<section style="min-height: 600px;">
	<p>Frage <strong>{question.id}</strong> von <strong>{questions.length}</strong></p>

	<small>Bitte kreuzen Sie an. Es gibt nur eine richtige Antwort.</small>

	<h3>{question.question}</h3>

	{#if question.image_url}
		<div style="display: flex; justify-content: center; align-items: center;">
			<img
				src="{base}{question.image_url}"
				alt="TBA"
				style="max-width: 256px; margin: 1rem auto;"
			/>
		</div>
	{/if}

	<form>
		{#each question.answers as answer, idx}
			<div
				style="display: grid; grid-template-columns: min-content 1fr min-content; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;"
			>
				<input
					type="radio"
					name="answer"
					value={idx}
					checked={selected_answer === idx}
					onchange={(e) => {
						selected_answer = idx;
						update_answer();
					}}
					aria-invalid={show_correct ? !answer.correct : undefined}
				/>
				<label
					for="answer"
					class:correct={show_correct && answer.correct}
					class:wrong={show_correct && !answer.correct}
				>
					{answer.text}
				</label>
				<kbd>{['A', 'S', 'D', 'F'][idx]}</kbd>
			</div>
		{/each}

		<noscript>
			<button type="submit" style="margin-top: 2rem;">Antworten</button>
		</noscript>
	</form>
</section>

{#if stats}
	<small>
		Zuletzt
		{#if stats.correct}
			<span style="color: var(--pico-form-element-valid-border-color);">richtig</span>
		{:else}
			<span style="color: var(--pico-form-element-invalid-border-color);">falsch</span>
		{/if}
		geantwortet am
		{stats.lastUpdated.toLocaleString('de-DE')}
	</small>
{/if}

<article style="margin-top: 1rem;" class="script">
	Du kannst die Antwort mit Tasten <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> oder <kbd>F</kbd> wählen.
</article>

<style>
	.correct {
		color: var(--pico-form-element-valid-border-color);
		background-color: var(--pico-form-element-valid-background-color);
	}

	.wrong {
		color: var(--pico-form-element-invalid-border-color);
		background-color: var(--pico-form-element-invalid-background-color);
	}
</style>
