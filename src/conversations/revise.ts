import { type Conversation } from '@grammyjs/conversations';
import { type Context } from 'grammy';
import { getDictionary } from '../dictionaries.ts';
import { shuffle } from '../util/shuffle.ts';
import { toStart } from '../util/to-start.ts';
import { waitWord } from '../util/wait-word.ts';

export async function revise(conversation: Conversation, ctx: Context) {
	const userId = ctx.from?.id;

	if (!userId) {
		return;
	}

	const dictionary = await conversation.external(() =>
		shuffle(getDictionary(userId)),
	);

	if (!dictionary.length) {
		await ctx.reply('You do not have any added words');
		return toStart(ctx, 'What will do?');
	}

	await ctx.reply(
		'I will send you translation and you will send me foreign word.',
	);

	for (const pair of dictionary) {
		const foreign = await waitWord(conversation, ctx, pair.translation);

		if (foreign === pair.foreign) {
			await ctx.reply('✅ Right!');
		} else {
			await ctx.reply(`❌ Failure! The right word is "${pair.foreign}"`);
		}
	}

	await toStart(ctx, 'Done! What will do?');
}
