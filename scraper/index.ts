import playwright from "playwright";
import { createWorker } from "tesseract.js";

const BASE_URL = "https://oet.bamf.de/ords/oetut/";
const START_URL = `${BASE_URL}f?p=514:1`;

const browser = await playwright.chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const ocr_worker = await createWorker("deu");

const questions = [];

try {
	await page.goto(START_URL);

	// for some reason the Bundeslands are numbered from 2 to 17 ¯\_(ツ)_/¯
	for (let i = 2; i <= 17; i++) {
		const _questions = [];

		// find select with id "P1_BUL_ID"
		const select = await page.$("#P1_BUL_ID");

		if (!select) throw new Error("select with id P1_BUL_ID not found");

		// select Bundesland 2 to 17
		await select.selectOption({ value: `${i}` });

		// get option element with selected="selected"
		const selected = await page.$(`#P1_BUL_ID option[value="${i}"]`);
		if (!selected) throw new Error("selected option not found");
		const name = await selected.innerText();
		console.log("Collecting questions for", name);

		// find input with value "Zum Fragenkatalog" and click it
		const input = await page.$("input[value='Zum Fragenkatalog']");
		if (!input) throw new Error("input with value 'Zum Fragenkatalog' not found");
		await input.click();

		for (let i = 1; i <= 310; i++) {
			// for (let i = 0; i < 3; i++) {
			console.log("Collecting question", i, "of", 310);
			// find img inside span with id "P30_AUFGABENSTELLUNG_BILD"
			const img = page.locator("#P30_AUFGABENSTELLUNG_BILD img");
			await img.waitFor({ timeout: 1500, state: "attached" });
			if (!img) throw new Error("img with id P30_AUFGABENSTELLUNG_BILD not found");

			const img_src = await img.getAttribute("src");
			if (!img_src) throw new Error("img with id P30_AUFGABENSTELLUNG_BILD not found");

			const full_img_src = `${BASE_URL}${img_src}`;

			const {
				data: { text },
			} = await ocr_worker.recognize(full_img_src);
			const question = text.replace(/\n/g, "");

			// find first input with type radio and click it
			const radio = await page.$("input[type='radio']");
			if (!radio) throw new Error("input with type radio not found");
			await radio.click();

			// Find the table and extract the answers
			const answers = await page.$$eval(".t3borderless tr", (rows) => {
				return Array.from(rows, (row) => {
					const cells = row.querySelectorAll("td");
					const correct = cells[0].querySelector("span")!.style.color === "green";
					const text = cells[2].textContent!.trim();
					return { correct, text };
				});
			});

			_questions.push({ id: i, question, answers });

			// find input with type button and value "nächste Aufgabe >" and click it
			const nextButton = await page.$("input[type='button'][name='GET_NEXT_ID'][value='nächste Aufgabe >']");
			if (nextButton) await nextButton.click();

			await page.waitForTimeout(1000);
		}

		questions.push({
			name,
			questions: _questions,
		});

		// find input with type button and value "zur Startseite" and click it
		const startButton = await page.$("input[type='button'][value='zur Startseite']");
		if (!startButton) throw new Error("start button not found");
		await startButton.click();

		await page.waitForTimeout(1000);
	}
} catch (error) {
	console.error(error);

	browser.close();
	ocr_worker.terminate();
	await Bun.write("err_questions.json", JSON.stringify(questions));
	process.exit(1);
} finally {
	await Bun.write("questions.json", JSON.stringify(questions));
	await browser.close();
	await ocr_worker.terminate();
}
