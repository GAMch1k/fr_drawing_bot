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

    choose_lang_main_menu: {
        "reply_markup": {
            "resize_keyboard": true,
            "inline_keyboard": [
                [
                    {
                        "text": "English 🇬🇧",
                        "callback_data": "langmm_en"
                    }
                ],
                [
                    {
                        "text": "Українська 🇺🇦",
                        "callback_data": "langmm_ua"
                    }
                ],
                [
                    {
                        "text": "Русский 🇷🇺",
                        "callback_data": "langmm_ru"
                    },
                ]
            ]
        }
    },

    // sub_to_chanel: { // reply_markup is in send_photo parameters [./bot/answers.js -> subToChanel()]
    //     "resize_keyboard": true,
    //     "inline_keyboard": [
    //         [
    //             {
    //                 "text": "Peacy Tron",
    //                 "url": "https://t.me/test_for_freelance_ch_2" // https://t.me/peacytron
    //             }
    //         ],
    //         [
    //             {
    //                 "text": "Next/Далі/Далее",
    //                 "callback_data": "check_sub",
    //             }
    //         ]
    //     ]
    // },

    sub_to_chanel(lang) {   // reply_markup is in send_photo parameters [./bot/answers.js -> subToChanel()]
        return {
            "resize_keyboard": true,
            "inline_keyboard": [
                [
                    {
                        "text": ph.sub_to_chanel_btn[lang],
                        "url": "https://t.me/peacytron" // https://t.me/peacytron
                    }
                ],
                [
                    {
                        "text": ph.next_btn[lang],
                        "callback_data": "check_sub",
                    }
                ]
            ]
        }
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

    conditions(lang) {
        return {
            "resize_keyboard": true,
            "inline_keyboard": [
                [
                    {
                        "text": ph.next_btn[lang],
                        "callback_data": "ready_conditions",
                    }
                ]
            ]
        }
    },

    ready_to_menu(lang) {
        return {
            "reply_markup": {
                "resize_keyboard": true,
                "inline_keyboard": [
                    [
                        {
                            "text": ph.next_btn[lang],
                            "callback_data": "main_menu"
                        }
                    ]
                ]
            }
        }
    },

    main_menu(lang) {
        return {
            "reply_markup": this.main_menu2(lang)
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
                ],
                [
                    {
                        "text": ph.main_menu_change_language_btn[lang],
                        "callback_data": "main_menu_change_language"
                    }
                ]
            ]
        }
    },

    check_trx_wallet(lang) { 
        return {
            "reply_markup": {
                "resize_keyboard": true,
                "one_time_keyboard": true,
                "inline_keyboard": [
                    [
                        {
                            "text": ph.check_trx_approve_btn[lang],
                            "callback_data": "trx_approve"
                        },
                        {
                            "text": ph.check_trx_edit_btn[lang],
                            "callback_data": "trx_edit"
                        }
                    ]
                ]
            }
        }
    }


}