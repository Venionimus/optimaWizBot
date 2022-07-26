const {Telegraf, Scenes, Markup, session} = require('telegraf')
require('dotenv').config()

const chooseLenses = require('./scenes/chooseLenses')
const infoLenses = require('./scenes/infoLenses')
const manager = require('./scenes/manager')


const bot = new Telegraf(process.env.BOT_TOKEN)


const stage = new Scenes.Stage([chooseLenses, infoLenses, manager])
bot.use(session())
bot.use(stage.middleware())


bot.hears('🔆 Подобрать линзы', ctx => ctx.scene.enter('chooseWizard'))
bot.hears('❓ Подробная информация о линзах', ctx => ctx.scene.enter('infoWizard'))
bot.hears('☎  Связаться с отделом продаж', ctx => ctx.scene.enter('managerWizard'))

bot.start(async (ctx)=> {
    try {
        await ctx.reply('Нажмите на одну из кнопок ниже ⤵ :', Markup.keyboard([
            ['🔆 Подобрать линзы'],
            ['❓ Подробная информация о линзах'],
            ['☎  Связаться с отделом продаж']
        ]).oneTime().resize())
    } catch (e){
        console.log(e)
    }
})

bot.launch()

