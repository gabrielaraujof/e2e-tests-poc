const assert = require('assert')

describe('webdriver.io page', () => {
    it('should have the right title', async () => {
        // await browser.url('https://9-web.wh.bileto.sympla.com.br/event/60165')
        await browser.url('http://localhost:8081/event/60165')
        const innerEl = await $('app-page');
        const pages = await innerEl.shadow$('iron-pages')
        const eventPage = await pages.$('#eventPage')
        const header = await eventPage.shadow$('app-header')
        const button = await header.shadow$('header app-button')
        await button.waitForClickable({ timeout: 5000 })
        await button.click()
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.', await button.getAttribute('class')); // outputs: 'test123'
    })
})