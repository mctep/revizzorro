import { Keyboard, type Context } from 'grammy';

export function toStart(ctx: Context, greeting: string) {
	return ctx.reply(greeting, {
		reply_markup: {
			one_time_keyboard: true,
			keyboard: new Keyboard()
				.text('Add a word')
				.text('Your words')
				.text('Revise')
				.resized()
				.build(),
		},
	});
}
