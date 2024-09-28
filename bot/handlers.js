const bot = require("./bot.js");
const answer = require("./answers.js");
const utils = require("./utils.js");
const ph = require("./phrases.js");

const db = require("../database/manager.js");


bot.on("message", async msg => {
    const chatId = msg.chat.id;
    const text = msg?.text;
    const username = msg?.from?.username;
    const user = await db.getUser(chatId);

    if (text.includes("/start")) {
        console.log(chatId, await db.isUserExists(chatId))
        if (!await db.isUserExists(chatId)) {
            let name = utils.genName(msg); 

            let ref = 0;
            if (text.includes("ref_")) {
                ref = parseInt(text.split("_")[1]);
            }
            
            await db.newUser(chatId, name, username, ref);

            answer.chooseLanguage(chatId);
            return;
        }
        if (!user.subscribed) {
            if (user.language) {
                await answer.subToChanel(chatId, user.language);
            } else {
                answer.chooseLanguage(chatId);
            }
            return;
        }
        await answer.mainMenu(chatId, user.language);
        return;
    }

    if (user.position == "enter_trx") {
        await db.updateUserWallet(chatId, text);
        await answer.checkTRXWallet(chatId, user.language, text);
        await db.updateUserPosition(chatId, "_");
        return;
    }
    await answer.wrongCommand(chatId);
})



bot.on("callback_query", async query => {
    const chatId = query.from.id;
    const data = query.data;
    let res_message = ""
    const user = await db.getUser(chatId);

    if (data.includes("lang_")) {
        const lang = data.split("_")[1];
        await db.updateUserLang(chatId, lang);
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.languageSet(chatId, lang);
        
        await answer.subToChanel(chatId, lang);
    }
    
    else if (data == 'check_sub') {
        let _user = await bot.getChatMember("@test_for_freelance_ch_2", chatId);
        
        if (_user.status == "member") {
            await bot.deleteMessage(chatId, query.message.message_id);
            await db.userSubscribed(chatId);
            db.addTickets(user.referal);

            let referal = await db.getUser(user.referal);
            console.log(referal)
            await answer.newReferal(referal.userId, user.name, referal.language)
            await answer.conditions(chatId, user.language);
        } else {
            res_message = ph.not_subscribed[user.language]
        }
    }

    else if (data == 'ready_conditions') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.enterTRXWallet(chatId, user.language);
        await db.updateUserPosition(chatId, "enter_trx");
    }

    else if (data == 'main_menu') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.mainMenu(chatId, user.language);
        await db.updateUserPosition(chatId, "main_menu");
    }

    else if (data == 'main_menu_conditions') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.conditions2(chatId, user.language);
    }

    else if (data == 'main_menu_stat') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.stats(chatId, user.language, user.tickets);
    }

    else if (data == 'main_menu_top10') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.top10(chatId, user.language, user.tickets);
    }

    else if (data == 'main_menu_buy_pct') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.buyPct(chatId, user.language, user.tickets);
    }

    else if (data == 'main_menu_change_language') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.chooseLanguageMainMenu(chatId);
    }

    else if (data.includes("langmm_")) {
        const lang = data.split("_")[1];
        await db.updateUserLang(chatId, lang);
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.languageSet(chatId, lang);
        
        await answer.mainMenu(chatId, lang);
    }

    else if (data == 'trx_approve') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.readyConditions(chatId, user.language, user.tickets);
    }

    else if (data == 'trx_edit') {
        await bot.deleteMessage(chatId, query.message.message_id);
        await answer.enterTRXWallet(chatId, user.language);
        await db.updateUserPosition(chatId, "enter_trx");
    }


    bot.answerCallbackQuery(query.id, res_message);
})

