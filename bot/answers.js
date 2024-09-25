const bot = require("./bot.js");
const keyboard = require("./keyboards.js");
const ph = require("./phrases.js");


async function chooseLanguage(chatId) {
    await bot.sendMessage(chatId, ph.choose_lang, keyboard.choose_lang);
}

async function languageSet(chatId, lang) {
    await bot.sendMessage(chatId, ph.language_set[lang], keyboard.main_menu);
}


async function subToChanel(chatId, lang) {
    await bot.sendMessage(chatId, ph.short_desc[lang], keyboard.sub_to_chanel);
}

function wrongCommand(chatId) {
    bot.sendMessage(chatId, "Wrong command");
}


module.exports = {
    chooseLanguage,
    languageSet,
    subToChanel,
    wrongCommand
}