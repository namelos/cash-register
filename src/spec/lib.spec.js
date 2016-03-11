import { parseString, calculate95Percent } from '../lib'
import { expect } from 'chai'

describe('parseString', () => {
  it('should split "ITEM000002-2" as ["ITEM000002", 2]', () =>
    expect(parseString("ITEM000002-2")).to.eql(["ITEM000002", 2]))
  it('should split "ITEM000001" as ["ITEM000001", 1]', () =>
    expect(parseString("ITEM000001")).to.eql(["ITEM000001", 1]))
})

describe('calculate95Percent', () =>
  it('should discount 95% correctly', () =>
    expect()))