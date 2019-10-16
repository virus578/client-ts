/* eslint-disable */
(window as any)._initTime = (time: number) => {
  let _time = new Date(time).toLocaleString('chinese', { hour12: false })
  return _time.replace(/\//g, '-')
}
// 深度克隆
const _clone = (target: any) => {
  if (typeof target === 'object') {
    let _tem: any = Array.isArray(target) ? [] : {}
    for (const key in target) {
      _tem[key] = _clone(target[key])
    }
    return _tem
  } else {
    return target
  }
}
(window as any)._clone = _clone
  // 优化条件语句
  // (Object as any).prototype._get = function _get(value: string) {
  //   let that: any = (this as any)
  //   return (<any>this)[value] || console.error('请检查对象是否存在该属性')
  // }
  (Array.prototype as any)._concat = function (...rest: Array<any>) {
    rest.map(item => {
      item.map((row: any) => {
        this.push(row)
      })
    })
    return this
  }
/*
链式编程返回原数据类型
函数式不修改原数据类型
*/
/*
数组 forEach splice push pop shift unshift 修改原数组
slice()第一个参数起始位置 第二个参数结束位置
splice()
*/
/*
字符串修改方法
trim() toLowerCase()
substring()
substr()
slice()
 */
