import { hJSX } from '@cycle/dom'

const header = <p>***&lt;没钱赚商店&gt;购物清单***</p>

const divider = <p>----------------------</p>

const boldDivider = <p>**********************</p>

// render list
export const renderList = list =>
  list.map(({ name, quantity, unit, price, subtotal, saved }) => <li>
    名称：{name}，数量：{quantity}{unit}，单价：{price}(元)，小计：{subtotal}(元){
    saved && `，节省${saved}(元)`}
  </li>)


// render buy two get one list
export const renderBonusList = bonus =>
  bonus.map(({ name, b2G1FQuantity, unit }) =>
    <li>名称：{ name }，数量：{ b2G1FQuantity }{ unit }</li>)

export const renderBonus = bonus => do {
  if (bonus.length)
    <div>
      <p>买二赠一商品：</p>
      <ul>{ renderBonusList(bonus) }</ul>
      { divider }
    </div>
}

export const renderTotalSaved = totalSaved => do {
  if (totalSaved === "0.00")
    null
  else
    <p>节省：{ totalSaved }(元)</p>
}

// root view stream, accept stream data
export default data$ =>
  data$.map(({ list, bonus, total, totalSaved }) => <div>
    <header>{ header }</header>
    <ul>{ renderList(list) }</ul>
    { divider }
    { renderBonus(bonus) }
    <p>总计：{ total }(元)</p>
    { renderTotalSaved(totalSaved) }
    { boldDivider }
  </div>)

