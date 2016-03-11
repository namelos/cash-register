import { parseString, calc95Percent, calcB2G1F, calcBoth, getFormulae } from '../lib'
import { expect } from 'chai'

describe('parseString', () => {
  it('should split "ITEM000002-2" as ["ITEM000002", 2]', () =>
    expect(parseString("ITEM000002-2")).to.eql(["ITEM000002", 2]))
  it('should split "ITEM000001" as ["ITEM000001", 1]', () =>
    expect(parseString("ITEM000001")).to.eql(["ITEM000001", 1]))
})

describe('calc95Percent', () =>
  it('should discount 95% correctly', () =>
    expect(calc95Percent(10, 10)).to.equal(95)))

describe('calcB2G1F', () => {
  it('should buy 2 give 1 free when larger than 2', () =>
    expect(calcB2G1F(1, 3)).to.equal(2))
  it('should buy not discount when smaller than 3', () =>
    expect(calcB2G1F(1, 2)).to.equal(2))
})

describe('calcBoth', () => {
  it('should buy 2 give 1 free when larger than 2', () =>
    expect(calcBoth(1, 3)).to.equal(2))
  it('should discount 95% when smaller than 3', () =>
    expect(calcBoth(1, 2)).to.equal(1.9))
})