import { Observable } from 'rx'
import { run } from '@cycle/core'
import { hJSX, makeDOMDriver } from '@cycle/dom'
import { input1, input2, input3, input4 } from './input.json'
import { config1, config2, config3, config4 } from './config.json'
import model from './model'
import view from './view'
const { of } = Observable

const main = ({}) => ({
  DOM: of(<div>
    { view(model(input1, config1)) }
    { view(model(input2, config2)) }
    { view(model(input3, config3)) }
    { view(model(input4, config4)) }
  </div>)
})

run(main, { DOM: makeDOMDriver('#app') })
