const {Markup, Composer, Scenes} = require( 'telegraf')
const yesUndefined = name => typeof name === 'undefined' ? '' : name;

const startStep = new Composer()
startStep.on("text", async ctx=> {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        ctx.wizard.state.data.startSt = 'Клиент перешел в раздел "Связаться с отделом продаж"'
        await ctx.replyWithHTML('🔔 Вы можеет заказать <b>Обрантый звонок</b>, для этого потребуется отправить ваш номер телефона или нажмите кнопку <b>Способы связи</b>, что бы связаться самостоятельно ', Markup.inlineKeyboard([
            [Markup.button.callback('🛎 Обратный звонок ', 'number')],
            [Markup.button.callback('📲 Способы связи ', 'contacts')],
        ]).resize())


        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const conditionStep = new Composer()
conditionStep.action('contacts', async ctx=> {
    try {
        ctx.answerCbQuery()
        const wizardData = ctx.wizard.state.data

        let result = await ctx.replyWithHTML( `<b>Информация о действии: </b>\n<i>${wizardData.startSt}</i> \n\n<b>Контакты: </b>${yesUndefined(wizardData.firstName)} ${yesUndefined(wizardData.lastName)}\n<b>Телеграм: </b>@${wizardData.userName}`)
        await ctx.telegram.forwardMessage('355568428', ctx.chat.id,  result.message_id)
        await ctx.telegram.deleteMessage(ctx.chat.id,  result.message_id)
        await ctx.replyWithHTML('<b>📱 Способы связи: </b>\n\n')
        await ctx.replyWithHTML('<a href ="https://t.me/Dmitriy_msm"> <b>🔵 Написать в Телеграм</b></a>\n' +
            '  \n' +
            '<a href ="https://wa.me/+79251513144?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%0A%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C+%D0%BB%D0%B8%D0%BD%D0%B7%D1%8B+Optima%2C+%D0%BD%D1%83%D0%B6%D0%BD%D0%B0+%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%21"> <b>🟢 Написать в WhatsApp</b></a>\n' +
            '  \n' +
            ' <b>🟡 Позвонить: +79251513144 </b>\n', {disable_web_page_preview: true})

        return ctx.wizard.next()

    } catch (e) {
        console.log(e)
    }
})

conditionStep.action('number', async ctx=> {
    try {
        ctx.answerCbQuery()

        await ctx.reply('Что бы отправить номер телефона, нажмите кнопку ниже ⤵', Markup.keyboard([
            [Markup.button.contactRequest('☎ Отправить контакт')]
        ]).resize().oneTime())

        return ctx.wizard.next()

    } catch (e) {
        console.log(e)
    }
})

const callBackStep = new Composer()
callBackStep.on('message', async ctx =>{
    try {
        ctx.wizard.state.data.callBack = ctx.message.contact.phone_number
        const wizardData =  ctx.wizard.state.data
        let result = await ctx.replyWithHTML( `<b>Информация о действии: </b>\n<i>${wizardData.startSt}</i> \n\n<b>Контакты: </b>${yesUndefined(wizardData.firstName)} ${yesUndefined(wizardData.lastName)}\n<b>Телеграм: </b>@${wizardData.userName} \n\n <b>Хочет заказать обратный звонок </b>\n ${wizardData.callBack}`)
        await ctx.telegram.forwardMessage('355568428', ctx.chat.id,  result.message_id)
        await ctx.telegram.deleteMessage(ctx.chat.id,  result.message_id)
        await ctx.replyWithHTML('<b>☑ Заявка отправленна администратору</b>\n\n <u>📞 В ближайшее время Вам перезвонят </u>\n')

        return ctx.scene.leave()
    } catch (e) {
        console.log(e)
    }
})

callBackStep.action('number', async ctx=> {
    try {
        ctx.answerCbQuery()

        await ctx.reply('Что бы отправить номер телефона, нажмите кнопку ниже ⤵️', Markup.keyboard([
            [Markup.button.contactRequest('☎ Отправить контакт')]
        ]).resize().oneTime())

        return ctx.wizard.next()

    } catch (e) {
        console.log(e)
    }
})

callBackStep.action('contacts', async ctx=> {
    try {
        ctx.answerCbQuery()
        const wizardData = ctx.wizard.state.data

        let result = await ctx.replyWithHTML( `<b>Информация о действии: </b>\n<i>${wizardData.startSt}</i> \n\n<b>Контакты: </b>${yesUndefined(wizardData.firstName)} ${yesUndefined(wizardData.lastName)}\n<b>Телеграм: </b>@${wizardData.userName}`)
        await ctx.telegram.forwardMessage('355568428', ctx.chat.id,  result.message_id)
        await ctx.telegram.deleteMessage(ctx.chat.id,  result.message_id)
        await ctx.replyWithHTML('<b>📱 Способы связи: </b>\n\n')
        await ctx.replyWithHTML('<a href ="https://t.me/Dmitriy_msm"> <b>🔵 Написать в Телеграм</b></a>\n' +
            '  \n' +
            '<a href ="https://wa.me/+79251513144?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%0A%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C+%D0%BB%D0%B8%D0%BD%D0%B7%D1%8B+Optima%2C+%D0%BD%D1%83%D0%B6%D0%BD%D0%B0+%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%21"> <b>🟢 Написать в WhatsApp</b></a>\n' +
            '  \n' +
            ' <b>🟡 Позвонить: +79251513144 </b>\n', {disable_web_page_preview: true})

        return ctx.wizard.next()

    } catch (e) {
        console.log(e)
    }
})

const callBackStep2 = new Composer()
callBackStep2.on('message', async ctx =>{
    try {
        ctx.wizard.state.data.callBack = ctx.message.contact.phone_number
        const wizardData =  ctx.wizard.state.data
        let result = await ctx.replyWithHTML( `<b>Информация о действии: </b>\n<i>${wizardData.startSt}</i> \n\n<b>Контакты: </b>${yesUndefined(wizardData.firstName)} ${yesUndefined(wizardData.lastName)}\n<b>Телеграм: </b>@${wizardData.userName} \n\n <b>Хочет заказать обратный звонок </b>\n ${wizardData.callBack}`)
        await ctx.telegram.forwardMessage('355568428', ctx.chat.id,  result.message_id)
        await ctx.telegram.deleteMessage(ctx.chat.id,  result.message_id)
        await ctx.replyWithHTML('<b>☑ Заявка отправленна администратору</b>\n\n <u>📞 В ближайшее время Вам перезвонят </u>\n')


        return ctx.scene.leave()
    } catch (e) {
        console.log(e)
    }
})

const manager = new Scenes.WizardScene('managerWizard', startStep, conditionStep, callBackStep, callBackStep2)
module.exports = manager