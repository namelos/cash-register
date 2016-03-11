import { Observable } from 'rx'
import { contains, head, last, prop, __ } from 'ramda'
import { parseString, equal95Percent, equalB2G1F, sum, subtract, multiply,getFormulae, b2G1FQuantity, toFixed2 } from './lib'
const { from, zip } = Observable

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
  // split stream as metastreams, then group them by the head of array(category)
  const items$$ = from(input).map(parseString).groupBy(head)

  // flat map on stream branches get last sample(category) then reduce quantity by sum
  const category$ = items$$.flatMap(item$ => item$.map(head).last())
  const quantity$ = items$$.flatMap(item$ => item$.map(last).reduce(sum))

  // get information props from config
  const info$ = category$.map(prop(__, config))
  const name$ = info$.map(prop('name'))
  const unit$ = info$.map(prop('unit'))
  const price$ = info$.map(prop('price')).map(toFixed2)
  const discounts$ = info$.map(prop('discounts'))

  // get formula from discounts
  const formula$ = discounts$.map(getFormulae)

  // calculate subtotal with formulae, then calculate total without discount, subtract them to get money than saved
  const subtotal$ = zip(price$, quantity$, formula$,
    (price, quantity, formula) => formula(price, quantity)).map(toFixed2)
  const subtotalWithoutDiscount$ = zip(quantity$, price$, multiply)
  const saved$ = zip(subtotalWithoutDiscount$, subtotal$, subtract).map(toFixed2)

  // pack list information in stream, if there is no 95% discount remove saved from pack
  const list$ = zip(name$, quantity$, unit$, price$, subtotal$, saved$, discounts$,
    (name, quantity, unit, price, subtotal, saved, discounts) => do {
    if (equal95Percent(discounts))
      ({ name, quantity, unit, price, subtotal, saved })
    else
      ({ name, quantity, unit, price, subtotal })
  }).toArray()

  // get those buy 2 get 1 streams then pack for bonus block
  const b2G1F$ = discounts$.filter(equalB2G1F)
  const b2G1FQuantity$ = quantity$.map(b2G1FQuantity)
  const bonus$ = zip(name$, b2G1FQuantity$, unit$, b2G1F$,
    (name, b2G1FQuantity, unit) =>
      ({ name, b2G1FQuantity, unit })).toArray()

  // reduce sum to get total and total saved
  const total$ = subtotal$.reduce(sum).map(toFixed2)
  const totalSaved$ = saved$.reduce(sum).map(toFixed2)

  // zip to return data structure to view for rendering
  return zip(list$, bonus$, total$, totalSaved$,
    (list, bonus, total, totalSaved) =>
      ({ list, bonus, total, totalSaved }))
}