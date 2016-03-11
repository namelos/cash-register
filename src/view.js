import { hJSX } from '@cycle/dom'

const header = <p>***&lt;没钱赚商店&gt;购物清单***</p>

const divider = <p>----------------------</p>

const boldDivider = <p>**********************</p>

export const renderList = list =>
  list.map(item => <div></div>)

export const renderBonus = bonus =>
  bonus.map(item => <div></div>)

export default data$ =>
  data$.map(({ list, bonus, total, totalSaved }) => <div>
    { header }
    <ul>{ renderList(list) }</ul>
    { divider }
    <ul>{ renderBonus(bonus) }</ul>
    { divider }
    <p>总计：{ total }(元)</p>
  </div>)

