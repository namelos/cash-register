import { multiply, cond, equals, T, always } from 'ramda'

export const _95Percent = '95'
export const b2G1F = 'b1'

// parse "ITEM000002-2" as ["ITEM000002", 2]
// or "ITEM000001" as ["ITEM000001", 1]
export const parseString = item => {
  const pair = item.split('-')
  const category = pair[0]
  const quantity = parseInt(pair[1] || 1)
  return [category, quantity]
}

// calculate 95% discount
export const calc95Percent = (price, quantity) =>
  price * quantity * 0.95

// calculate buy two get one free discount
export const calcB2G1F = (price, quantity) =>
  price * (quantity - parseInt(quantity / (2 + 1)))

// when two discounts happens both
export const calcBoth = (price, quantity) => {
  if (quantity > 2)
    return calcB2G1F(price, quantity)
  else
    return calc95Percent(price, quantity)
}

// discount pattern matching function
export const getFormulae = cond([
  [equals([b2G1F, _95Percent]), always(calcBoth)],
  [equals([b2G1F]), always(calcB2G1F)],
  [equals([_95Percent]), always(calc95Percent)],
  [T, always(multiply)]
])

