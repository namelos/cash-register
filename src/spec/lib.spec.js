import { parseString, _95Percent, b2G1F, equalsSet, b2G1FQuantity,
  calc95Percent, calcB2G1F, calcBoth, getFormulae } from '../lib'
import { multiply } from 'ramda'
import { expect } from 'chai'

describe('parseString', () => {
  it('splits "ITEM000002-2" as ["ITEM000002", 2]', () =>
    expect(parseString("ITEM000002-2")).to.eql(["ITEM000002", 2]))
  it('splits "ITEM000001" as ["ITEM000001", 1]', () =>
    expect(parseString("ITEM000001")).to.eql(["ITEM000001", 1]))
})

describe('equalSet', () => {
  it('equals two same set', () =>
    expect(
      equalsSet(new Set([1, 2, 3]))(new Set([1, 3, 2]))
    ).to.be.true)
})

describe('b2G1FQuantity', () =>
  it('calculates correct free quantity', () =>
    expect(b2G1FQuantity(3))))

describe('calc95Percent', () =>
  it('discounts 95% correctly', () =>
    expect(calc95Percent(10, 10)).to.equal(95)))

describe('calcB2G1F', () => {
  it('buys 2 give 1 free when larger than 2', () =>
    expect(calcB2G1F(1, 3)).to.equal(2))
  it('does not discount when smaller than 3', () =>
    expect(calcB2G1F(1, 2)).to.equal(2))
})

describe('calcBoth', () => {
  it('buys 2 give 1 free when larger than 2', () =>
    expect(calcBoth(1, 3)).to.equal(2))
  it('discounts 95% when smaller than 3', () =>
    expect(calcBoth(1, 2)).to.equal(1.9))
})

describe('getFormulae', () => {
  it('discounts 95% when only have 95% discount', () =>
    expect(getFormulae([_95Percent])(10, 10))
      .to.equal(calc95Percent(10, 10)))
  it('buys 2 give 1 free when only have buy 2 give 1 discount', () =>
    expect(getFormulae([b2G1F])(1, 3))
      .to.equal(calcB2G1F(1, 3)))
  it('buys 2 give 1 when have both discounts when larger than 2', () =>
    expect(getFormulae([b2G1F, _95Percent])(1, 3))
      .to.equal(calcBoth(1, 3)))
  it('works even swapped', () =>
    expect(getFormulae([_95Percent, b2G1F])(1, 3))
      .to.equal(calcBoth(1, 3)))
  it('discounts 95% when smaller than 3, though have both discounts', () =>
    expect(getFormulae([_95Percent])(1, 2))
      .to.equal(calcBoth(1, 2)))
  it('multiplies price and quantity when no discounts avaiable', () =>
    expect(getFormulae(undefined)(1, 2))
      .to.equal(multiply(1, 2)))
})
