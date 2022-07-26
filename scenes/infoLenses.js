const {Markup, Composer, Scenes} = require( 'telegraf')

const yesUndefined = name => typeof name === 'undefined' ? '' : name;

const startStep = new Composer()
startStep.on("text", async ctx=> {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.firstName = ctx.message.from.first_name
        ctx.wizard.state.data.lastName = ctx.message.from.last_name
        ctx.wizard.state.data.startSt = 'Клиент перешел в раздел подбора линз и нажал "Получить консультацию"'
        await ctx.replyWithHTML('<b>🗂 Каталог линз Optima :</b>', Markup.inlineKeyboard([
            [Markup.button.url('📍 Bi-LED LENS Element Series', 'https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi_led_adaptive_2225078361?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.url('📍 Bi-LED LENS Expression Series','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_bi_led_linzy_optima_expression_2417310150?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.url('📍 Bi-LED LENS Competizione','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi_led_2321589264?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing')],
            [Markup.button.url('📍 Bi-LED LENS Alteza PS','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi-led_alteza_ps_3_0_2097830865?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing')],
            [Markup.button.url('📍 Bi-LED LENS Alteza Double Vision','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_linzy_bi_led_2097528719?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing_seller')],
            [Markup.button.url('📍 Bi-LED LENS Alteza GTR 2.8','https://www.avito.ru/moskva/zapchasti_i_aksessuary/svetodiodnye_bi_led_linzy_alteza_2416933984')],
            [Markup.button.callback('🆓 Получить бесплатную консультацию', 'contacts')]
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
        await ctx.replyWithHTML('<b>☑ Заявка отправленна специалисту</b>\n\n <u>Если вы не хотите ждать, можете связаться первым: </u>\n')
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


const infoLenses = new Scenes.WizardScene('infoWizard', startStep, conditionStep)
module.exports = infoLenses