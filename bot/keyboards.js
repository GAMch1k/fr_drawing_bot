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

    sub_to_chanel: {
        "reply_markup": {
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
        }
    }
}