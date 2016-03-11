import { hJSX } from '@cycle/dom'

export default data$ =>
  data$.map(x => <div>{ x }</div>)