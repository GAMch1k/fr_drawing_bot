const ph = require("./phrases.js");

module.exports = {
    choose_lang: {
        "reply_markup": {
            "resize_keyboard": true,
            "inline_keyboard": [
                [
                    {
                        "text": "English 🇬🇧",
                        "callback_data": "lang_en"
                    }
                ],
                [
                    {
                        "text": "Українська 🇺🇦",
                        "callback_data": "lang_ua"
                    }
                ],
                [
                    {
                        "text": "Русский 🇷🇺",
                        "callback_data": "lang_ru"
                    },
                ]
            ]
        }
    },

    sub_to_chanel: { // reply_markup is in send_photo parameters [./bot/answers.js -> subToChanel()]
        "resize_keyboard": true,
        "inline_keyboard": [
            [
                {
                    "text": "Peacy Tron",
                    "url": "https://t.me/peacytron"
                }
            ],
            [
                {
                    "text": "Next/Далі/Далее",
                    "callback_data": "check_sub",
                }
            ]
        ]
    },

    conditions: { // reply_markup is in send_photo parameters [./bot/answers.js -> conditions()]
        "resize_keyboard": true,
        "inline_keyboard": [
            [
                {
                    "text": "Next/Далі/Далее",
                    "callback_data": "ready_conditions",
                }
            ]
        ]
    },

    ready_to_menu: {
        "reply_markup": {
            "resize_keyboard": true,
            "inline_keyboard": [
                [
                    {
                        "text": "Next/Далі/Далее",
                        "callback_data": "main_menu"
                    }
                ]
            ]
        }
    },

    main_menu(lang) {
        return {
            "reply_markup": {
                "resize_keyboard": true,
                "one_time_keyboard": true,
                "inline_keyboard": [
                    [
                        {
                            "text": ph.main_menu_conditions_btn[lang],
                            "callback_data": "main_menu_conditions"
                        },
                        {
                            "text": ph.main_menu_stat_btn[lang],
                            "callback_data": "main_menu_stat"
                        }
                    ],
                    [
                        {
                            "text": ph.main_menu_top10_btn[lang],
                            "callback_data": "main_menu_top10"
                        },
                        {
                            "text": ph.main_menu_buy_pct_btn[lang],
                            "callback_data": "main_menu_buy_pct"
                        }
                    ]
                ]
            }
        }
    },


    main_menu2(lang) { // without reply_markup
        return {
            "resize_keyboard": true,
            "one_time_keyboard": true,
            "inline_keyboard": [
                [
                    {
                        "text": ph.main_menu_conditions_btn[lang],
                        "callback_data": "main_menu_conditions"
                    },
                    {
                        "text": ph.main_menu_stat_btn[lang],
                        "callback_data": "main_menu_stat"
                    }
                ],
                [
                    {
                        "text": ph.main_menu_top10_btn[lang],
                        "callback_data": "main_menu_top10"
                    },
                    {
                        "text": ph.main_menu_buy_pct_btn[lang],
                        "callback_data": "main_menu_buy_pct"
                    }
                ]
            ]
        }
    }
}