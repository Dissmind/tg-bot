const tgBot = require('node-telegram-bot-api')
const os = require('os')

const token = '1233073904:AAGw1i5AV1Yevns9zhqJJgvKy3aoPNxN9yw'
const bot = new tgBot(token, {polling: true})

bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, `Hello from ${os.type()}`)
})