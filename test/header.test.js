const moment = require('moment')
require('@testing-library/jest-dom/extend-expect')
const JSDOM= require('jsdom')
const fs =require('fs')
const path = require('path')
const ejs =require('ejs') 

const targetFile = path.resolve(__dirname, '../views/partials/header.ejs')

ejs.renderFile(targetFile, function (err, str) {
  if (str) {
    let dom
    let container

    describe('Header', () => {
      beforeEach(() => {
        dom = new JSDOM.JSDOM(str, { moment }, { runScripts: 'dangerously' })
        container = dom.window.document.body
      })

      test('should show 1', () => {
        console.log('>>> ', container.querySelector('div').textContent)
        expect(container.querySelector('div')).not.toBeNull()
        expect(1).toBe(1)
      })
    })
  }
})
