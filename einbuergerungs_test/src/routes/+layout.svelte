<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<main>
	<div>
		<hgroup>
			<h2>Einbürgerungstest</h2>
			<p>Fragenkatalog zur Testvorbereitung</p>
		</hgroup>
	</div>

	{@render children?.()}
</main>

<footer class="py-3">
	<div>
		Alle Fragen und Antworten stammen von <a href="https://oet.bamf.de/ords/oetut/f?p=514:1">
			<code>https://oet.bamf.de/ords/oetut/f?p=514:1</code>
		</a>
		und dem Copyright gehört den Bundesamt für Migration und Flüchtlinge.
	</div>
	<div>
		<a href="https://mastermakrela.com">Ich</a>
		habe nur bessere UI/UX gebaut ;)
	</div>
</footer>

<noscript>
	<style>
		kbd,
		.script {
			display: none;
		}
	</style>
</noscript>

<style>
	main {
		max-width: 1024px;
		margin: 0 auto;
		padding: 2rem;
	}

	:global(kbd) {
		font-size: 0.6rem;
	}

	footer {
		margin-top: 8rem;
		font-size: 0.5rem;
		border-top: 1px solid var(--pico-muted-border-color);
		text-align: center;
		padding-top: 0.25rem;

		code:hover {
			text-decoration: underline;
		}
	}
</style>
