import { Observable } from 'rx'
import { run } from '@cycle/core'
import { hJSX, makeDOMDriver } from '@cycle/dom'
import input from './input.json'
import config from './config.json'
const { from, of } = Observable

const main = () => {
  return {
    DOM: from([1, 2, 3]).map(x => <div>{ x }</div>)
  }
}

run(main, {
  DOM: makeDOMDriver('#app')
})