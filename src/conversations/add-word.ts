import { type Conversation } from '@grammyjs/conversations';
import { type Context } from 'grammy';
import { addDictionaryPair } from '../dictionaries.ts';
import { toStart } from '../util/to-start.ts';
import { waitWord } from '../util/wait-word.ts';

export async function addWord(conversation: Conversation, ctx: Context) {
	const userId = ctx.from?.id;

	if (!userId) {
		return;
	}

	const foreign = await waitWord(conversation, ctx, 'Send me a foreign word.');

	if (!foreign) {
		return;
	}

	const translation = await waitWord(conversation, ctx, 'Send me translation.');

	if (!translation) {
		return;
	}

	addDictionaryPair(userId, { foreign, translation });

	await toStart(ctx, 'I added your word. What to do next?');
}
