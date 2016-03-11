import { hJSX } from '@cycle/dom'

export const view = data$ => data$.map(x => <div>{ x }</div>)