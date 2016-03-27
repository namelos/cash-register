import chai, { expect } from 'chai'
import model from '../model'
import { input1, input2, input3, input4 } from '../input.json'
import { config1, config2, config3, config4 } from '../config.json'

describe('model', () => {
  it('returns proper result when given input1 and config1', () => {
    model(input1, config1).map(result => {
      const expected = {
        list: [
          { name: '羽毛球', price: '1.00', quantity: 5, unit: '个', subtotal: '4.00' },
          { name: '可口可乐', price: '3.00', quantity: 3, unit: '瓶', subtotal: '6.00' },
          { name: '苹果', price: '5.50', quantity: 2, unit: '斤', subtotal: '11.00' }
        ],
        bonus: [
          { name: '羽毛球', b2G1FQuantity: 1, unit: '个' },
          { name: '可口可乐', b2G1FQuantity: 1, unit: '瓶' },
        ],
        total: '21.00',
        totalSaved: '4.00'
      }
      expect(result).to.eql(expected)
    }).subscribe()
  })

  it('returns proper result when given input2 and config2', () => {
    model(input2, config2).map(result => {
      const expected = {
        list: [
          { name: '羽毛球', price: '1.00', quantity: 5, unit: '个', subtotal: '5.00' },
          { name: '可口可乐', price: '3.00', quantity: 3, unit: '瓶', subtotal: '9.00' },
          { name: '苹果', price: '5.50', quantity: 2, unit: '斤', subtotal: '11.00' }
        ],
        bonus: [],
        total: '25.00',
        totalSaved: '0.00'
      }
      expect(result).to.eql(expected)
    }).subscribe()
  })

  it('returns proper result when given input3 and config3', () => {
    model(input3, config3).map(result => {
      const expected = {
        list: [
          { name: '羽毛球', price: '1.00', quantity: 5, unit: '个', subtotal: '5.00' },
          { name: '可口可乐', price: '3.00', quantity: 3, unit: '瓶', subtotal: '9.00' },
          { name: '苹果', price: '5.50', quantity: 2, unit: '斤', subtotal: '10.45', saved: '0.55' }
        ],
        bonus: [],
        total: '24.45',
        totalSaved: '0.55'
      }
      expect(result).to.eql(expected)
    }).subscribe()
  })

  it('returns proper result when given input4 and config4', () => {
    model(input4, config4).map(result => {
      const expected = {
        list: [
          { name: '羽毛球', price: '1.00', quantity: 6, unit: '个', subtotal: '4.00' },
          { name: '可口可乐', price: '3.00', quantity: 3, unit: '瓶', subtotal: '6.00' },
          { name: '苹果', price: '5.50', quantity: 2, unit: '斤', subtotal: '10.45', saved: '0.55' }
        ],
        bonus: [
          { name: '羽毛球', b2G1FQuantity: 2, unit: '个' },
          { name: '可口可乐', b2G1FQuantity: 1, unit: '瓶' },
        ],
        total: '20.45',
        totalSaved: '5.55'
      }
      expect(result).to.eql(expected)
    }).subscribe()
  })
})

