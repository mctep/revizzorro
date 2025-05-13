import { type Conversation } from '@grammyjs/conversations';
import { type Context } from 'grammy';
import { getDictionary } from '../dictionaries.ts';
import { toStart } from '../util/to-start.ts';

export async function yourWords(conversation: Conversation, ctx: Context) {
	const userId = ctx.from?.id;

	if (!userId) {
		return;
	}

	const dictionary = getDictionary(userId);

	if (dictionary.length) {
		await ctx.reply(
			`Your dictionary:\n${dictionary.map((d) => `${d.foreign} — ${d.translation}`).join('\n')}`,
		);
	} else {
		await ctx.reply('You have no added words yet');
	}

	await toStart(ctx, 'What will do?');
}
