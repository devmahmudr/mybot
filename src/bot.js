import { Bot } from "grammy";
import 'dotenv/config'
const bot =  new Bot(process.env.BOT_TOKEN)

bot.api.setMyCommands([
    {command:'start',description:'strt bot'},
    {command:"info",description:'information about bot'}
])

bot.command('start',async ctx =>{
    ctx.reply('hello,', ctx.from.first_name)
} )
bot.on('message', ctx =>{
    const chatid = ctx.message.chat.id
    const message = ctx.message.text
    if(message == 'sticker') return ctx.api.sendSticker(chatid,'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/pins_bs_6_by_stickers_catalog_bot/724718.160.webp')
    if(message == '/info') return ctx.api.sendMessage(chatid, "this bot created by Makhmud for the lesson")

    bot.api.sendMessage(chatid,'sorry bot i don\'t understand to you')
})
bot.start()