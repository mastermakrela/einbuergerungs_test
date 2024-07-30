<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	$inspect(data);
</script>

<p>
	Esse dolore <mark>occaecat irure sunt non voluptate quis aliquip.</mark> Exercitation nostrud enim
	incididunt in sit tempor veniam. Magna ipsum exercitation occaecat do esse proident velit adipisicing
	qui fugiat. Officia quis ipsum enim sunt consequat est ex aliquip aliqua proident amet quis sit minim.
</p>

<form method="post" use:enhance>
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
