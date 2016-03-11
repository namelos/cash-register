import { Observable } from 'rx'
import { contains, head, last, add, subtract, multiply, prop, __ } from 'ramda'
import { parseString } from './lib'
const { from, zip } = Observable

// 主逻辑模块, 接受条形码输入以及商品信息, 返回用于渲染的数据结构
export default model = (input, config) => {
  // 将输入的数组转化为流, 将条形码字符串分割, 根据数组序对头部(商品类别category)分类支流
  const items$$ = from(input).map(parseString).groupBy(head)

  const category$ = items$$.flatMap(item$ => item$.map(head).last())
  const quantity$ = items$$.flatMap(item$ => item$.map(last).reduce(add))
  
  const info$ = category$.map(prop(__, dict))
  const unit$ = info$.map(prop('unit'))
  const price$ = info$.map(prop('price'))
  const discounts$ = info$.map(prop('discounts'))
}