import express from 'express';
import { app } from './app.ts';
import { TELEGRAM_TOKEN } from './env.ts';
import { assert } from './util/assert.ts';

async function main() {
	assert(TELEGRAM_TOKEN, 'TELEGRAM_TOKEN is not defined');
	await app(TELEGRAM_TOKEN);

	const web = express();
	const port = process.env.PORT || 4000;

	web.get('/', (req, res) => {
		res.send('I am alive!');
	});

	web.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
}

void main();
