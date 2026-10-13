# Einbürgerungstest

Better UI/UX for the BAMF Einbürgerungstest question catalogue (NRW only). Static SvelteKit site, deployed to GitHub Pages by `.github/workflows/deploy.yml`. Progress is stored in the browser's localStorage.

```bash
bun install
bun run dev      # http://localhost:5179/einbuergerungs_test
bun run check    # svelte-check
bun run lint     # oxfmt + prettier + oxlint
BASE_PATH=/einbuergerungs_test bun run build
```

The questions live in `src/lib/nrw_questions.json`. `scraper/` is the one-off script that collected them from the BAMF site.
