<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	let selected = $state<string>();
	let bundesland = $derived(selected ?? data.bundeslands[0]);
</script>

<p>
	Bessere <sub>meiner Meinung nach</sub> UI und UX für die Einbürgerungstest Fragenkatalog.
	<br />
	Alle Inhalte stammen von
	<a href="https://oet.bamf.de/ords/oetut/f?p=514:1">
		<em>Einbürgerungstest Fragenkatalog zur Testvorbereitung</em>
	</a>
	von <em>Bundesamt für Migration und Flüchtlinge</em>
	<br />
	Warum nur NRW?
</p>

<h4>Wählen Sie zunächst bitte Ihr Bundesland:</h4>

<select name="bundesland" bind:value={selected}>
	{#each data.bundeslands as name}
		<option value={name}>{name}</option>
	{/each}
</select>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
	<a role="button" href={resolve('/fragen/[bundesland]', { bundesland })}>Zum Fragenkatalog</a>

	<a
		role="button"
		href={resolve('/fragen/[bundesland]/[question_id]', { bundesland, question_id: '1' })}
	>
		Zum Quiz
	</a>
</div>
