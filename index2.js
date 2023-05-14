const TelegramBot = require("node-telegram-bot-api");
const {gameOption, againOption} = require("./options")
const token = "5700085228:AAHCNXUhuB1M9TA6etAdmPxw91EwxDWzdpg";

const bot = new TelegramBot(token, { polling: true });

const chats = {}





const startGame = async(chatId)=>{
    await bot.sendMessage(chatId, 'Сейчас я загадаю от 0 до 9, а ты должен ее угадать!')
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Отгадать!", gameOption)
}

const start = () =>{
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: "/info", description: "Получить информацию о пользователья"},
        {command: "/game", description:"Игра угадай цифру"}
    ])
    
    
    bot.on("message", async (msg) => {
      const text = msg.text;
      const chatId = msg.chat.id;
    
      if (text === "/start") {
       await bot.sendSticker(chatId, 'sticker.webp');
        return bot.sendMessage(chatId, `Добро пожаловать на наш ИТ Курс по Фронтенд РАЗРАБОТЧИКА`);
      }
    
      if(text === "/info"){
      return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
      }
      if(text === "/game"){
       return startGame(chatId)
      }
        return bot.sendMessage(chatId, "Я тебя не понимаю побробуй снова")
    });
    
    bot.on('callback_query', msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
            return startGame(chatId)
        }

        if(data === chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOption)
        }else{
            return bot.sendMessage(chatId, `Увы, ты не угадал цифру ${chats[chatId]}`, againOption)
        }
    })
}

start()