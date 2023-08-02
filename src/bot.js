import { Bot } from "grammy";
import "dotenv/config";
import Io from "./helper/Io.js";
const bot = new Bot(process.env.BOT_TOKEN);

const myBot = async() => {
  const data = new Io("./db/users.json");
  const users = await data.read();

  //setting my commands
  bot.api.setMyCommands([
    { command: "start", description: "strt bot" },
    { command: "info", description: "information about bot" },
  ]);

  //when starting bot
  bot.command("start", async (ctx) => {
    ctx.reply("hello,", +ctx.from.first_name);
  });

  //when user send any message
  bot.on("message", (ctx) => {
    const chatid = ctx.message.chat.id;
    const message = ctx.message.text;
    if (message == "photo")
      return ctx.api.sendPhoto(chatid, "https://picsum.photos/300/300");
    if (message == "/info")
      return ctx.api.sendMessage(
        chatid,
        "this bot created by Makhmud Rakhmatjonov for the lesson"
      );
    bot.api.sendMessage(chatid, "sorry bot i don't understand to you");
  });

  //sending new user to Telegram Channel
  const channelId = process.env.CHANNEL_ID;
  bot.api.sendMessage(channelId, JSON.stringify(users));
  bot.start();
};
export default myBot();
