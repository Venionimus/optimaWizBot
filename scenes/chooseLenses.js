const {Markup, Composer, Scenes} = require( 'telegraf')


const yesUndefined = name => typeof name === 'undefined' ? '' : name;

// id Dimona 355568428
// id Мой 464597691

const startStep = new Composer()
startStep.on("text", async ctx=> {
    try {
       ctx.wizard.state.data = {}
         ctx.wizard.state.data.userName = ctx.message.from.username
         ctx.wizard.state.data.firstName = ctx.message.from.first_name
         ctx.wizard.state.data.lastName = ctx.message.from.last_name
        await ctx.replyWithHTML('<b>🚗 Укажите марку и модель вашего автомобиля</b>\n<i>Например: Kia Sportage</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const generationStep = new Composer()
generationStep.on("text", async ctx=> {
    try {
        ctx.wizard.state.data.generation = ctx.message.text
        await ctx.replyWithHTML('<b>🏎 Укажите поколение и год вашего автомобиля</b>\n<i>Например: 3 рейстайлинг 2015</i>')
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

const lenseStep = new Composer()
lenseStep.on("text", async ctx=> {
    try {
        ctx.wizard.state.data.lense = ctx.message.text
        await ctx.replyWithHTML('<b>🔮 Ваша оптика линзованная?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('✅ Да', 'isLense'), Markup.button.callback('❎ Нет', 'notLense')]
        ]))
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

//Адаптивные фары: Да || Нет

const adaptiveStep = new Composer()
adaptiveStep.action('isLense', async ctx=> {
    try {
        await ctx.answerCbQuery()
        ctx.wizard.state.data.adaptive = 'Линзованная'
        await ctx.replyWithHTML('<b>🔆 Адаптивные фары?</b>', Markup.inlineKeyboard([
            [Markup.button.callback('✅ Да', 'isAdaptive'), Markup.button.callback('❎ Нет', 'notAdaptive')]
        ]))
        return ctx.wizard.next()


    } catch (e) {
        console.log(e)
    }
})

adaptiveStep.action('notLense', async ctx=> {
    try {
        await ctx.answerCbQuery()
        ctx.wizard.state.data.adaptive = 'Не линзованная'
        const wizardData = ctx.wizard.state.data
        let result = await ctx.replyWithHTML( `<b>${wizardData.generation}</b>\n${wizardData.lense}\n\n<b>Оптика: </b>${wizardData.adaptive}\n\n<b>Контакты: </b>${yesUndefined(wizardData.firstName)} ${yesUndefined(wizardData.lastName)}\n<b>Телеграм: </b>@${wizardData.userName}`)
        await ctx.telegram.forwardMessage('355568428', ctx.chat.id,  result.message_id)
        await ctx.telegram.deleteMessage(ctx.chat.id,  result.message_id)
        await ctx.replyWithHTML('📂 Ваш вариант универсальные линзы под рефлекторную оптику <b>Alteza GTR 2.8</b>',
            Markup.inlineKeyboard([
            [Markup.button.url('📖 Подробная информация', 'https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_bi_led_linzy_alteza_2416933984')],
            [Markup.button.url('🖥 Обзор на YouTube', 'https://youtu.be/QsELjZbRcHU')],
            [Markup.button.callback('🛒 Заказать', 'contacts')]
        ]))
        return ctx.wizard.next()

    } catch (e) {
        console.log(e)
    }
})


// Выбранны адаптивные фары, Выбранны НЕ адаптивные фары, Нажата кнопка ЗАКАЗАТЬ из шага не лизвонные
const conditionStep = new Composer()
conditionStep.action("isAdaptive", async ctx=> {
    try {
        await ctx.answerCbQuery()
        ctx.wizard.state.data.condition = 'Адаптивные фары'
        const wizardData = ctx.wizard.state.data
        let result = await ctx.replyWithHTML( `<b>${wizardData.generation}</b>\n${wizardData.lense}\n\n<b>Оптика: </b>${wizardData.adaptive} \n <b>${wizardData.condition}</b> \n\n<b>Контакты: </b>${yesUndefined(wizardData.firstName)} ${yesUndefined(wizardData.lastName)}\n<b>Телеграм: </b>@${wizardData.userName}`)
        await ctx.telegram.forwardMessage('355568428', ctx.chat.id,  result.message_id)
        await ctx.telegram.deleteMessage(ctx.chat.id,  result.message_id)
        await ctx.replyWithHTML('<b>📂 Вам подходят два вида линз:</b>', Markup.inlineKeyboard([
            [Markup.button.url('📍 Bi-LED LENS Element Series', 'https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi_led_adaptive_2225078361?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.url('📍 Bi-LED LENS Expression Series','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_bi_led_linzy_optima_expression_2417310150?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.callback('🛒 Заказать', 'contacts1')]
            ]).resize())

        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

conditionStep.action("notAdaptive", async ctx=> {
    try {
        await ctx.answerCbQuery()
        ctx.wizard.state.data.condition = 'Не адаптивные фары'
        const wizardData = ctx.wizard.state.data
        let result = await ctx.replyWithHTML( `<b>${wizardData.generation}</b>\n${wizardData.lense}\n\n<b>Оптика: </b>${wizardData.adaptive} \n <b>${wizardData.condition}</b> \n\n<b>Контакты: </b>${yesUndefined(wizardData.firstName)} ${yesUndefined(wizardData.lastName)}\n<b>Телеграм: </b>@${wizardData.userName}`)
        await ctx.telegram.forwardMessage('355568428', ctx.chat.id,  result.message_id)
        await ctx.telegram.deleteMessage(ctx.chat.id,  result.message_id)
        await ctx.replyWithHTML('<b>✅ Заявка передана администратору и в ближайшее время с Вами свяжется менеджер для консультации, а пока вы можете ознакомиться с подробной информацией и ассортиментом линз, которые подходят для вашего автомобиля:</b>', Markup.inlineKeyboard([
            [Markup.button.url('📍 Bi-LED LENS Element Series', 'https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi_led_adaptive_2225078361?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.url('📍 Bi-LED LENS Expression Series','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_bi_led_linzy_optima_expression_2417310150?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.url('📍 Bi-LED LENS Competizione','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi_led_2321589264?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing')],
            [Markup.button.url('📍 Bi-LED LENS Alteza PS','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi-led_alteza_ps_3_0_2097830865?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing')],
            [Markup.button.url('📍 Bi-LED LENS Alteza Double Vision','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi_led_2097528719?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.url('📍 Bi-LED LENS Alteza GTR 2.8','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_bi_led_linzy_alteza_2416933984')],
            [Markup.button.callback('🛒 Заказать', 'contacts1')]
        ]).resize())


        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
})

conditionStep.action('contacts', async ctx=> {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('<a href ="https://t.me/Dmitriy_msm"> <b>🔵 Написать в Телеграм</b></a>\n' +
            '  \n' +
            '<a href ="https://wa.me/+79251513144?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%0A%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C+%D0%BB%D0%B8%D0%BD%D0%B7%D1%8B+Alteza+GTR+2.8"> <b>🟢 Написать в WhatsApp</b></a>\n' +
            '  \n' +
            ' <b>🟡 Позвонить: +79251513144 </b>\n', {disable_web_page_preview: true})
        return ctx.scene.leave()

    } catch (e) {
        console.log(e)
    }
})

const contactStep = new Composer()
contactStep.action('contacts1', async ctx=> {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('<a href ="https://t.me/Dmitriy_msm"> <b>🔵 Написать в Телеграм</b></a>\n' +
            '  \n' +
            '<a href ="https://wa.me/+79251513144?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%0A%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C+%D0%BB%D0%B8%D0%BD%D0%B7%D1%8B+Optima%2C+%D0%BD%D1%83%D0%B6%D0%BD%D0%B0+%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%21"> <b>🟢 Написать в WhatsApp</b></a>\n' +
            '  \n' +
            ' <b>🟡 Позвонить: +79251513144 </b>\n', {disable_web_page_preview: true})
        return ctx.scene.leave()

    } catch (e) {
        console.log(e)
    }
})




const chooseLenses = new Scenes.WizardScene('chooseWizard', startStep, generationStep, lenseStep, adaptiveStep, conditionStep, contactStep)
module.exports = chooseLenses