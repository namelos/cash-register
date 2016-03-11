import { Observable } from 'rx'
import { run } from '@cycle/core'
import { hJSX, makeDOMDriver } from '@cycle/dom'
import input from './input.json'
import config from './config.json'
import model from './model'
import view from './view'
const { from, merge } = Observable

const main = () => ({ DOM: view(model(input, config)) })

run(main, { DOM: makeDOMDriver('#app') })
// model(input, config)
//   .subscribe(console::console.log)
