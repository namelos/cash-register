import { cond, equals, T, always } from 'ramda'
import Decimal from 'decimal'

export const _95Percent = '九五折'
export const b2G1F = '买二赠一'

// decimal operator functions
export const sum= (x, y) =>
  Decimal(x).add(y).toNumber()

export const subtract = (x, y) =>
  Decimal(x).sub(y).toNumber()

export const multiply = (x, y) =>
  Decimal(x).mul(y).toNumber()

export const toFixed2 = x =>
  Number(x).toFixed(2)

// parse "ITEM000002-2" as ["ITEM000002", 2]
// or "ITEM000001" as ["ITEM000001", 1]
export const parseString = item => {
  const pair = item.split('-')
  const category = pair[0]
  const quantity = parseInt(pair[1] || 1)
  return [category, quantity]
}

export const b2G1FQuantity = quantity =>
  parseInt(Decimal(quantity).div(2 + 1))

// calculate 95% discount
export const calc95Percent = (price, quantity) =>
  Decimal(price).mul(quantity).mul(0.95).toNumber()

// calculate buy two get one free discount
export const calcB2G1F = (price, quantity) =>
  Decimal(quantity).sub(b2G1FQuantity(quantity)).mul(price).toNumber()
  // price * (quantity - b2G1FQuantity(quantity))

// when two discounts happens both
export const calcBoth = (price, quantity) => {
  if (quantity > 2)
    return calcB2G1F(price, quantity)
  else
    return calc95Percent(price, quantity)
}

// curried set equality checking for following pattern matching
export const equalsSet = setA => setB => {
  if (setA.size !== setB.size)
    return false
  for (var a of setA)
    if (!setB.has(a))
      return false
  return true
}

// discount pattern matching function
export const formulae = cond([
  [equalsSet(new Set([b2G1F, _95Percent])), always(calcBoth)],
  [equalsSet(new Set([b2G1F])), always(calcB2G1F)],
  [equalsSet(new Set([_95Percent])), always(calc95Percent)],
  [T, always(multiply)]
])

// check if satisfy discount conditions
export const equal95Percent = equals([_95Percent])

export const equalB2G1F = discounts =>
  new Set(discounts).has(b2G1F)

// change array to set for unordered equality
export const getFormulae = discount =>
  formulae(new Set(discount))
