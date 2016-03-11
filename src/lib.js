import { multiply } from 'ramda'

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