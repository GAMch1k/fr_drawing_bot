const bot = require("./bot.js");
const answer = require("./answers.js");
const utils = require("./utils.js");
const ph = require("./phrases.js");

const db = require("../database/manager.js");


bot.on("message", async msg => {
    const chatId = msg.chat.id;
    const text = msg?.text;


    if (text == "/start") {
        console.log(chatId, await db.isUserExists(chatId))
        if (!await db.isUserExists(chatId)) {
            let name = utils.genName(msg); 

            await db.newUser(chatId, name);
            answer.chooseLanguage(chatId);
            return;
        }
    } else {
        answer.wrongCommand(chatId);
    }
})



bot.on("callback_query", async query => {
    const chatId = query.from.id;
    const data = query.data;
    let res_message = ""
    const user = await db.getUser(chatId);

    if (data.includes("lang")) {
        const lang = data.split("_")[1];
        console.log(lang);
        await db.updateUserLang(chatId, lang);
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.languageSet(chatId, lang);
        
        await answer.subToChanel(chatId, lang);
    }
    
    else if (data == 'check_sub') {
        let _user = await bot.getChatMember("@test_for_freelance_ch_2", chatId);
        
        if (_user.status == "member") {
            
        } else {
            res_message = ph.not_subscribed[user.language]
        }
    }


    bot.answerCallbackQuery(query.id, res_message);
})

