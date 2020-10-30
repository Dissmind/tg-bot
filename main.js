const os = require('os')




const { Telegraf } = require('telegraf');
const covidApi = require('covid19-api');
const token = '1233073904:AAG2i4iPkhINYmTZQH_PHJHHdoJBDlHvVgw'

// const COUNTRIES_LIST = require('./const')
const bot = new Telegraf(token)


bot.start( ctx => ctx.reply(`
   Привет ${ctx.from.first_name}!
   Узнай статистику по Коронавирусу.
   Введи страну на английском языке и получи статистику.
   Получить весь список стран можно по команде /help."
   Hello from ${os.type()}!
`))

bot.help( ctx => ctx.reply(COUNTRIES_LIST)) // список всех стран на английском языке можно взять в документации covid19-api

bot.on('text', async (ctx) => {
    try {
        const userText = ctx.message.text
        const covidData = await covidApi.getReportsByCountries(userText)
        const countryData = covidData[0][0]
        const formatData = `
           Страна: ${countryData.country},
           Случаи: ${countryData.cases},
           Смерти: ${countryData.deaths},
           Выздоровело: ${countryData.recovered}`
        ctx.reply(formatData)
    } catch(e) {
        ctx.reply('Такой страны не существует, для получения списка стран используй команду /help')
    }
})

bot.launch()