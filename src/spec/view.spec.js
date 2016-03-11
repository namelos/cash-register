import chai, { expect } from 'chai'
import chaiVirtualDOM from 'chai-virtual-dom'
import { hJSX } from '@cycle/dom'
import { Observable } from 'rx'
const { just, of } = Observable
chai.use(chaiVirtualDOM)

import view from '../view'

describe('view function', () => {
  it('should render right parameter', () => {
    const expected = <div>{ 1 }</div>
    // const expected$ = just(1).map(() => expected)
    const expected$ = of(<div>{ 1 }</div>)
    expect(view(just(1))).to.exactly.look.like(expected$)
  })
})

describe('test view', () => {
  const vtree = <div id="foo">
    <h1 className="header">Welcome to our webpage</h1>
    <ol className="list">
      <li>First thing</li>
      <li>Second thing</li>
      <li>Third thing</li>
    </ol>
  </div>

  it('should look roughly like a list', () => {
    const expected = <div id="foo">
      <h1 className="header"></h1>
      <ol className="list"></ol>
    </div>
    expect(vtree).to.look.like(expected)
  })

  it('should look exactly like a list', () => {
    const expected = <div id="foo">
    <h1 className="header">Welcome to our webpage</h1>
    <ol className="list">
      <li>First thing</li>
      <li>Second thing</li>
      <li>Third thing</li>
    </ol>
  </div>
    expect(vtree).to.look.exactly.like(expected)
  })
})
