const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');

before (async function () {
	browser = await puppeteer.launch({
		headless: false,
		args: ['--window-size=1280,768']
	})
    page = await browser.newPage();
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
})

// after (async function () {

//     await page.close()
//     await browser.close()
// })

describe("Title Test", function(){
	it("should have the title", async() => {
		expect(
			await page.title()
		).to.eql("Quote Daily") 
	})
})

describe("Change Page Test", function(){
	it("should change page when hitting start button", async() => {

		await page.click("body > div > div > button")

		expect(
			await page.$(".appuse")
		).not.to.eql(null)
	})
})

describe("Typing Quote Test", function(){
	it("should display the input qoute", async() =>{
		const quote = "I love you more"
		await page.setViewport({ width:1268, height:768 })
		await page.type("body > div > div > div.search > input", quote)
		await page.click("body > div > div > div.search > button")
		await page.waitForSelector(".truncated")

		expect(
			await page.$(".truncated").textContent
		).to.eql(quote)
	})
})

after(function(){
	browser.close()

})