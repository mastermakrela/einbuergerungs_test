<script lang="ts">
	import { base } from '$app/paths';

	let { data, children } = $props();
</script>

<nav>
	<span>
		Fragen für
		<a href="{base}/fragen/{data.bundesland}" style="text-decoration: none;">
			{data.bundesland}
		</a>
	</span>
	<a href={base} style="display: flex;">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			style="height: 16px; width: 16px; align-self: center; margin-right: 0.25rem;"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
			/>
		</svg>
		Startseite
	</a>
</nav>

{@render children()}
