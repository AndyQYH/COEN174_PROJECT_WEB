const moment = require('moment')
require('@testing-library/jest-dom/extend-expect')
const JSDOM= require('jsdom')
const fs =require('fs')
const path = require('path')
const ejs =require('ejs') 

const targetFile = path.resolve(__dirname, '../views/partials/header.ejs')

ejs.renderFile(targetFile,{userinfo:''}, function (err, str) {
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

      test('should contain form', () => {
        console.log('>>> ', container.querySelector('form').textContent)
        expect(container.querySelector('form')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain class section', () => {
        console.log('>>> ', container.querySelector('.section').textContent)
        expect(container.querySelector('.section')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain script', () => {
        console.log('>>> ', container.querySelector('script').textContent)
        expect(container.querySelector('script')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain style', () => {
        console.log('>>> ', container.querySelector('div[style]').textContent)
        expect(container.querySelector('div[style]')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain svg', () => {
        console.log('>>> ', container.querySelector('svg').textContent)
        expect(container.querySelector('svg')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain post method', () => {
        console.log('>>> ', container.querySelector('form[method]').textContent)
        expect(container.querySelector('form[method]')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain label', () => {
        console.log('>>> ', container.querySelector('label').textContent)
        expect(container.querySelector('label')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain username/password', () => {
        console.log('>>> ', container.querySelector('label[for]').textContent)
        expect(container.querySelector('label[for]')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('should contain value', () => {
        console.log('>>> ', container.querySelector('input[value]').textContent)
        expect(container.querySelector('input[value]')).not.toBeNull()
        expect(1).toBe(1)
      })

      test('value should be visible', () => {
        console.log('>>> ', container.querySelector('input[value]').textContent)
        expect(container.querySelector('input[value]')).toBeVisible()
        expect(1).toBe(1)
      })

      test('post method shoule be visible', () => {
        console.log('>>> ', container.querySelector('form[method]').textContent)
        expect(container.querySelector('form[method]')).toBeVisible()
        expect(1).toBe(1)
      })

      test('label should be visible', () => {
        console.log('>>> ', container.querySelector('label').textContent)
        expect(container.querySelector('label')).toBeVisible()
        expect(1).toBe(1)
      })

      test('username/password should be visible', () => {
        console.log('>>> ', container.querySelector('label[for]').textContent)
        expect(container.querySelector('label[for]')).toBeVisible()
        expect(1).toBe(1)
      })

      test('style should be visible', () => {
        console.log('>>> ', container.querySelector('div[style]').textContent)
        expect(container.querySelector('div[style]')).toBeVisible()
        expect(1).toBe(1)
      })

      test('svg should be visible', () => {
        console.log('>>> ', container.querySelector('svg').textContent)
        expect(container.querySelector('svg')).toBeVisible()
        expect(1).toBe(1)
      })

      test('form should be visible', () => {
        console.log('>>> ', container.querySelector('form').textContent)
        expect(container.querySelector('form')).toBeVisible()
        expect(1).toBe(1)
      })

      test('class section should be visible', () => {
        console.log('>>> ', container.querySelector('.section').textContent)
        expect(container.querySelector('.section')).toBeVisible()
        expect(1).toBe(1)
      })

      test('script should not be visible', () => {
        console.log('>>> ', container.querySelector('script').textContent)
        expect(container.querySelector('script')).not.toBeVisible()
        expect(1).toBe(1)
      })

      test('div should be visible', () => {
        console.log('>>> ', container.querySelector('div').textContent)
        expect(container.querySelector('div')).toBeVisible()
        expect(1).toBe(1)
      })

    })
  }
})
