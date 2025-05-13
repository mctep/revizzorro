import {
	conversations,
	createConversation,
	type ConversationFlavor,
} from '@grammyjs/conversations';
import { Bot, type Context } from 'grammy';
import { addWord } from './conversations/add-word.ts';
import { revise } from './conversations/revise.ts';
import { yourWords } from './conversations/your-words.ts';
import { toStart } from './util/to-start.ts';

export async function app(token: string) {
	const bot = new Bot<ConversationFlavor<Context>>(token);

	bot.use(conversations());

	bot.use(createConversation(addWord));
	bot.hears('Add a word', async (ctx) => {
		await ctx.conversation.enter('addWord');
	});

	bot.use(createConversation(yourWords));
	bot.hears('Your words', async (ctx) => {
		await ctx.conversation.enter('yourWords');
	});

	bot.use(createConversation(revise));
	bot.hears('Revise', async (ctx) => {
		await ctx.conversation.enter('revise');
	});

	bot.command('start', async (ctx) => {
		await toStart(ctx, `Hello. Let's revise your vocab!`);
	});

	return bot.start();
}
