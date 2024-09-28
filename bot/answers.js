const bot = require("./bot.js");
const keyboard = require("./keyboards.js");
const ph = require("./phrases.js");
const db = require("../database/manager.js");
const keyboards = require("./keyboards.js");


async function chooseLanguage(chatId) {
    await bot.sendMessage(chatId, ph.choose_lang, keyboard.choose_lang);
}

async function languageSet(chatId, lang) {
    await bot.sendMessage(chatId, ph.language_set[lang]);
}

async function chooseLanguageMainMenu(chatId) {
    await bot.sendMessage(chatId, ph.choose_lang, keyboard.choose_lang_main_menu);
}


async function subToChanel(chatId, lang) {
    await bot.sendPhoto(chatId, "./images/1.jpg", {caption: ph.short_desc[lang], reply_markup: keyboard.sub_to_chanel(lang)});
}

async function conditions(chatId, lang) {
    await bot.sendPhoto(chatId, "./images/2.jpg", {caption: ph.conditions[lang], reply_markup: keyboard.conditions(lang)});
}

async function enterTRXWallet(chatId, lang) {
    await bot.sendMessage(chatId, ph.enter_trx_wallet[lang]);
}

async function checkTRXWallet(chatId, lang, wallet) {
    await bot.sendMessage(chatId, ph.check_trx_wallet[lang] + `\n\n${wallet}`, keyboards.check_trx_wallet(lang));
}

async function readyConditions(chatId, lang, tickets) {
    await bot.sendMessage(chatId, ph.ready_conditions[lang].replace('{tick}', tickets).replace('{ref}', 'https://t.me/PeacyTronGiveaway_Bot?start=ref_'+chatId), keyboard.ready_to_menu(lang));
}

async function mainMenu(chatId, lang) {
    await bot.sendMessage(chatId, ph.main_menu[lang], keyboard.main_menu(lang));
}


async function conditions2(chatId, lang) {
    await bot.sendPhoto(chatId, "./images/3.jpg", {caption: ph.conditions2[lang], reply_markup: keyboard.main_menu2(lang)});
}

async function stats(chatId, lang, tickets) {
    await bot.sendMessage(chatId, ph.stats[lang].replace('{tick}', tickets).replace('{ref}', 'https://t.me/PeacyTronGiveaway_Bot?start=ref_'+chatId), keyboard.main_menu(lang));
}

async function top10(chatId, lang) {
    let top10 = await db.getTop10Users();
    let text = "\n\n"
    top10.forEach((el, i) => {
        text += `${i + 1}. ${el.name} - ${el.tickets}\n`
    });
    await bot.sendMessage(chatId, ph.top10[lang] + text, keyboard.main_menu(lang));
}

async function buyPct(chatId, lang) {
    await bot.sendMessage(chatId, ph.buy_pct[lang], keyboard.main_menu(lang));
}

async function failedReferal(chatId, lang) {
    await bot.sendMessage(chatId, ph.failed_referal[lang]);
}

async function newReferal(chatId, name, lang) {
    await bot.sendMessage(chatId, ph.new_referal[lang].replace('{ref_name}', name));
}


function wrongCommand(chatId) {
    bot.sendMessage(chatId, "Wrong command");
}

module.exports = {
    chooseLanguage,
    languageSet,
    subToChanel,
    wrongCommand,
    conditions,
    enterTRXWallet,
    readyConditions,
    mainMenu,
    conditions2,
    stats,
    top10,
    buyPct,
    failedReferal,
    chooseLanguageMainMenu,
    checkTRXWallet,
    newReferal
}