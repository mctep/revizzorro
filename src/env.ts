import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve(process.cwd(), process.env.ENV_FILE ?? '.env'),
});

export const TELEGRAM_TOKEN = env('TELEGRAM_TOKEN');

function env(name: string) {
	return process.env[name];
}
