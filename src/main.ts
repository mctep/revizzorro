import { app } from './app.ts';
import { TELEGRAM_TOKEN } from './env.ts';
import { assert } from './util/assert.ts';

async function main() {
	assert(TELEGRAM_TOKEN, 'TELEGRAM_TOKEN is not defined');
	await app(TELEGRAM_TOKEN);
}

void main();
