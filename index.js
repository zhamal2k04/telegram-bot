const TelegramBot = require('node-telegram-bot-api');


const token = '5700085228:AAHCNXUhuB1M9TA6etAdmPxw91EwxDWzdpg';


const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/echo (.+)/, (msg, match) => {


    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    if (message === "/start") {
        bot.sendMessage(chatId, "👋🏻")
        bot.sendMessage(chatId, "Hi , welcome to my Telegram bot!")
        bot.sendMessage(chatId, "Type these codes: /menu, /training_split, /bye, /training_time or send gifs")
        bot.sendAudio(chatId, 'welcome.ogg')
    }
    else if (message === "/menu") {
        bot.sendMessage(chatId, '• Gainer for mass\n')
        bot.sendPhoto(chatId, 'gainer.jpg') 
        bot.sendMessage(chatId, '• Creatine for intensity\n')
        bot.sendPhoto(chatId, 'creatine.jpg')
        bot.sendMessage(chatId, '• Casein for good sleep\n')
        bot.sendPhoto(chatId, 'casein.jpg')
        bot.sendMessage(chatId, '• Bcaa for after or pre workout\n')
        bot.sendPhoto(chatId, 'bcaa.jpg')
        bot.sendMessage(chatId, '• Protein if cannot eat at time\n')
        bot.sendPhoto(chatId, 'protein.jpg')
    }
    else if (message === "/training_split") {
        bot.sendMessage(chatId, "Now we have just 2 workout split: Biceps and core workout.\nIf you want just type abs workout or biceps workout 👇🏻👇🏻👇🏻 ")
    }
    else if (message === "abs workout") {
        bot.sendVideo(chatId, 'core workout.mp4'), bot.sendMessage(chatId, '1) Abs core workout')
    }
    else if (message === "biceps workout") {
        bot.sendVideo(chatId, 'biceps_workout.mp4'), bot.sendMessage(chatId, '2) Biceps intense workout')
    }
    else if (message === "/bye") {
        bot.sendMessage(chatId, 'See you soon later . . .')
        bot.sendMessage(chatId, "👋🏻")
        bot.sendAudio(chatId, 'bye.ogg')
    }
    else if (message === "/training_time") {
        bot.sendMessage(chatId, 'Monday: Chest + Triceps 💪🏻\nTuesday: Back + Biceps 💪🏻\nWednesday: Shoulders + Legs 💪🏻\nFriday: Chest + Back 💪🏻\nSaturday: Shoulders + Legs 💪🏻\nSunday: Day off 😴')
    }
    else {
        bot.sendMessage(chatId, "I don't know what you sent me but you sent this:",)
        bot.sendAnimation(chatId, msg.document.file_id)
    }


});
