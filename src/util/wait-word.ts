import { type Conversation } from '@grammyjs/conversations';
import { type Context } from 'grammy';

export async function waitWord(
	conversation: Conversation,
	ctx: Context,
	greeting: string,
) {
	await ctx.reply(greeting);

	const response = await conversation.waitUntil(
		(ctx) => {
			const message = ctx.msg?.text;

			if (!message) {
				return false;
			}

			if (message.length > 255) {
				return false;
			}

			return true;
		},
		{
			otherwise: (ctx) =>
				ctx.reply('Send me a text message less than 255 chars'),
		},
	);

	return response.message?.text;
}
