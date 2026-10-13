import { browser } from '$app/env';

class _Stats {
	// $state so pages that read answers update right after updateAnswer()
	#answers = $state<Record<string, { correct: boolean; lastUpdated: Date }>>({});

	constructor() {
		if (browser) {
			try {
				const storedAnswers = localStorage.getItem('answers');
				if (storedAnswers) {
					// JSON turns Dates into strings; turn them back so toLocaleString() formats them
					this.#answers = JSON.parse(storedAnswers, (key, value) =>
						key === 'lastUpdated' ? new Date(value) : value
					);
				}
			} catch {
				// unreadable stored value: start empty instead of breaking every page
			}
		}
	}

	updateAnswer(key: string, number: number, correct: boolean) {
		const combinedKey = `${key}-${number}`;
		this.#answers[combinedKey] = { correct, lastUpdated: new Date() };
		if (browser) {
			localStorage.setItem('answers', JSON.stringify(this.#answers));
		}
	}

	getAnswer(key: string, number: number): { correct: boolean; lastUpdated: Date } | undefined {
		const combinedKey = `${key}-${number}`;
		return this.#answers[combinedKey];
	}

	summary(bundesland: string) {
		let correct = 0;
		let wrong = 0;

		for (const [key, value] of Object.entries(this.#answers)) {
			if (key.startsWith(`${bundesland}-`)) {
				if (value.correct) {
					correct++;
				} else {
					wrong++;
				}
			}
		}

		return { correct, wrong };
	}
}

export const Stats = new _Stats();
