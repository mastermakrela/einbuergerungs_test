import { browser } from '$app/environment';

class _Stats {
	#answers: Record<string, { correct: boolean; lastUpdated: Date }> = $state({});

	constructor() {
		if (browser) {
			const storedAnswers = localStorage.getItem('answers');
			if (storedAnswers) {
				this.#answers = JSON.parse(storedAnswers);
			}
		}
	}

	updateAnswer(key: string, number: number, correct: boolean) {
		const combinedKey = `${key}-${number}`;
		this.#answers[combinedKey] = { correct, lastUpdated: new Date() };
		if (browser) {
			localStorage.setItem('answers', JSON.stringify($state.snapshot(this.#answers)));
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
