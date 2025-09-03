<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from './$types.js';

	let { data } = $props();

	const _enhance: SubmitFunction = async ({ formData, cancel, action }) => {
		console.log('🚀 ~ const_enhance:SubmitFunction= ~ action:', action);

		switch (action.search) {
			case '?/collection':
				return goto('/fragen/' + formData.get('bundesland'));
			case '?/quiz':
				return goto('/fragen/' + formData.get('bundesland') + '/1');
		}
		cancel();
	};
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

<form method="post" use:enhance={_enhance}>
	<h4>Wählen Sie zunächst bitte Ihr Bundesland:</h4>

	<select name="bundesland">
		{#each data.bundeslands as bundesland}
			<option value={bundesland}>{bundesland}</option>
		{/each}
	</select>

	<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
		<button type="submit" formaction="?/collection">Zum Fragenkatalog</button>

		<button type="submit" formaction="?/quiz">Zum Quiz</button>
	</div>
</form>
