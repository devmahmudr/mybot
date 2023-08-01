import { Bot } from "grammy";
import 'dotenv/config'
const bot =  new Bot(process.env.BOT_TOKEN)

bot.api.setMyCommands([
    {command:'start',description:'strt bot'},
    {command:"info",description:'information about bot'}
])
bot.command('start',async ctx =>{
    ctx.reply('hello,', + ctx.from.first_name)
} )
bot.on('message', ctx =>{
    const chatid = ctx.message.chat.id
    const message = ctx.message.text
    if(message == 'photo') return ctx.api.sendPhoto(chatid,'https://picsum.photos/300/300')
    if(message == '/info') return ctx.api.sendMessage(chatid, "this bot created by Makhmud for the lesson")
    bot.api.sendMessage(chatid,'sorry bot i don\'t understand to you')
})


bot.start()