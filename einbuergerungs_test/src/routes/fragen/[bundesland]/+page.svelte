<script lang="ts">
	import { base } from '$app/paths';
	import { Stats } from '$lib/stats.svelte.js';

	let { data } = $props();

	let questions = $derived(data.questions);

	let { correct, wrong } = $derived(Stats.summary(data.bundesland));
</script>

<article style="margin-top: 2rem; text-align: right;">
	Von <strong>{questions.length}</strong> Fragen
	<span style="color: var(--pico-form-element-valid-border-color);">
		<strong>{correct}</strong> richtig
	</span>
	und
	<span style="color: var(--pico-form-element-invalid-border-color);">
		<strong>{wrong}</strong> falsch
	</span>
</article>

<table style="margin-top: 2rem;">
	<thead>
		<tr>
			<th>ID</th>
			<th>Question</th>
			<th>Status</th>
			<th>Beantwortet am</th>
		</tr>
	</thead>
	<tbody>
		{#each questions as question, idx}
			{@const _stats = Stats.getAnswer(data.bundesland, question.id)}
			<tr>
				<td>
					{question.id}
					{#if question.image_url}🎆{/if}
				</td>
				<td><a href="{base}/fragen/{data.bundesland}/{idx + 1}">{question.question}</a></td>
				<td>
					{#if _stats}
						<small>
							{#if _stats.correct}
								<span style="color: var(--pico-form-element-valid-border-color);">richtig</span>
							{:else}
								<span style="color: var(--pico-form-element-invalid-border-color);">falsch</span>
							{/if}
						</small>
					{/if}
				</td>
				<td>
					{#if _stats}
						<small>{_stats.lastUpdated.toLocaleString()}</small>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
