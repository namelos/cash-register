import { run } from '@cycle/core'
import { hJSX, makeDOMDriver } from '@cycle/dom'
import { input1, input2, input3, input4 } from './input.json'
import { config1, config2, config3, config4 } from './config.json'
import model from './model'
import view from './view'

const main = () => ({ DOM: view(model(input1, config1)) })

run(main, { DOM: makeDOMDriver('#app') })

