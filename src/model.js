import { Observable } from 'rx'
import { contains, head, last, prop, __ } from 'ramda'
import { parseString, sum, subtract, multiply,getFormulae, b2G1FQuantity, toFixed2 } from './lib'
const { of, from, zip, merge, combineLatest } = Observable
/*
    Observables are immutable lazy stream monad generic.
  Caculate which is not observed does not happen as well,
  so there would be less wasting, and all calculating happens
  immediately when needed.
    Use full declarative style to provides more abstraction
  as well as cleaner codes.
*/

// main logic module
export default (input, config) => {
  // 将输入的数组转化为流, 将条形码字符串分割, 根据数组序对头部(商品类别category)分类支流
  const items$$ = from(input).map(parseString).groupBy(head)

  const category$ = items$$.flatMap(item$ => item$.map(head).last())
  const quantity$ = items$$.flatMap(item$ => item$.map(last).reduce(sum))
  
  const info$ = category$.map(prop(__, config))
  const name$ = info$.map(prop('name'))
  const unit$ = info$.map(prop('unit'))
  const price$ = info$.map(prop('price'))
  const discounts$ = info$.map(prop('discounts'))

  const formula$ = discounts$.map(getFormulae)

  const subtotal$ = zip(price$, quantity$, formula$,
    (price, quantity, formula) => formula(price, quantity)).map(toFixed2)
  const subtotalWithoutDiscount$ = zip(quantity$, price$, multiply)
  const saved$ = zip(subtotalWithoutDiscount$, subtotal$, subtract).map(toFixed2)

  const list$ = zip(name$, quantity$, unit$, price$, subtotal$, saved$,
    (name, quantity, unit, price, subtotal, saved) =>
      ({ name, quantity, unit, price, subtotal, saved })).toArray()

  const b2G1F$ = quantity$.map(b2G1FQuantity)
  const bonus$ = zip(name$, b2G1F$, unit$,
    (name, b2G1F, unit) => ({ name, b2G1F, unit })).toArray()

  const total$ = subtotal$.reduce(sum).map(toFixed2)
  const totalSaved$ = saved$.reduce(sum).map(toFixed2)

  return combineLatest(list$, bonus$, total$, totalSaved$,
    (list, bonus, total, totalSaved) =>
      ({ list, bonus, total, totalSaved }))
}