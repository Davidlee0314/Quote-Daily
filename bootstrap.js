const puppeteer = require("puppeteer")
const { expect } = require("chai")
const _ = require('lodash')
const globalVariables = _.pick(global, ['browser', 'expect'])

before(async function(){
	global.expect = expect
	global.browser = await puppeteer.launch({headless: false})
})

describe("Title Test", function(){

	const page = browser.newPage()

	await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' })
	console.log(await page.title())

	it("should have the title", async (done) => {
		expect(
			await page.title()
		).to.eql("Quote Daily") 
		done()
	}
})

// after(function(){
// 	browser.close()
// })
