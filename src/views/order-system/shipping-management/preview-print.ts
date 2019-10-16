import JsBarcode from 'jsbarcode'
// import QRCodeImpl from 'qr.js/lib/QRCode'
// import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
import axios from 'axios'
const QRCodeImpl = require('qr.js/lib/QRCode')
const ErrorCorrectLevel = require('qr.js/lib/ErrorCorrectLevel')
const head = "<html xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='content-type' content='text/html; charset=utf-8'/> <title></title><style> *{margin: 0;padding: 0}img{border: none}</style></head><body style='margin: 0'><div>"
const bottom = '</div></body></html>'
let num = 1 // 序号
/**
 * 模板标签的批量打印与面单批量打印不同，实际上也是单文件打印
 * */
export function print(this: any, bool: Boolean, flag: Boolean) {
  // 横向打印需要适量缩小实际打印大小
  let diff = this.templateData.direction === 1 ? 16 : 0
  let { width, height } = this.templateData.size

  // 渲染具体标签内容
  let back = '<div style="position: relative;margin:0 auto;page-break-before:always;' + `height:${Number((parseInt(height) * (72 / 25.4)).toFixed(2)) - diff}pt;` + `width:${(parseInt(width) * (72 / 25.4)).toFixed(2)}pt;` + 'overflow:hidden;' + '">'

  // 主体标签单个渲染，添加进预览数据
  let main_print = (bool: any) => {
    return back + template.call(this, this.templateData, this.printData.print_data, bool).join('') + '</div>'
  }

  let mainContent = main_print(false)
  this.htmlList.push(mainContent)

  // 打印标签时
  num = 1
  bool && (this.printParams.content += new Array(this.printData.print_num).fill(1).map(row => main_print(bool)).join(''))

  /*
  *  将要打印的内容拼接起来
  *  判断传入的参数flag是否为true如果为true就打印，当循环完成时flag才为true
  *  因为for循环提交表单的时候只会提交最后一次所以这里需要一个参数flag当循环完成时提交一次表单
  *  打印完后要初始化only类型引导标签的标识
  * */

  if (flag) {
    this.printParams.direction = this.templateData.direction ? 'transverse' : 'vertical'
    this.printParams.height = this.templateData.direction ? this.templateData.size.width : this.templateData.size.height
    this.printParams.width = this.templateData.direction ? this.templateData.size.height : this.templateData.size.width
    this.printParams.content = head + this.printParams.content + bottom
    this.printParams.NumberList = Date.now()

    if (!this.printer) {
      this.$message({ type: 'warning', message: '请指定打印机，再打印' })
    }
    let printer = JSON.parse(this.printer)
    let params = Object.assign({}, this.printParams, { PrintName: printer.name })
    axios.post('http://127.0.0.1:10093/print', obj2url(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(({ data }) => {
      this.$message({ type: 'success', message: '打印成功' })
      this.$emit('finish-print')
    }).catch(code => {
      this.$message({ type: 'error', message: code.message })
    })
  }
}
// 渲染整个标签内容
function template(this: any, templateData: any, printData: any, bool: Boolean,) {
  let arr: Array<any> = []
  clone(templateData.temp_data).forEach((row: any) => {
    let tag, single
    // 单项元素的样式
    if (bool) { // 需要打印时考虑到大小拉伸带来的影响
      single = `height:${px2pt(row.style.height)}pt;width:${px2pt(row.style.width)}pt;font-family:${row.style.fontFamily};font-weight:${row.style.fontWeight};font-size:${px2pt(row.style.fontSize)}pt;text-align:${row.style.textAlign};left:${px2pt(get_location(row.style.fontSize, row.style.width, row.style.left))}pt;top:${px2pt(get_location(row.style.fontSize, row.style.height, row.style.top))}pt;text-decoration:${row.style.textDecoration};-webkit-transform:${row.style['-webkit-transform']}`
    } else {
      single = `height:${px2pt(row.style.height)}pt;width:${px2pt(row.style.width)}pt;font-family:${row.style.fontFamily};font-weight:${row.style.fontWeight};font-size:${px2pt(row.style.fontSize)}pt;text-align:${row.style.textAlign};left:${px2pt(row.style.left)}pt;top:${px2pt(row.style.top)}pt;text-decoration:${row.style.textDecoration};-webkit-transform:${row.style['-webkit-transform']}`
    }

    // 非前端提供标签
    if (row.type === 1) {
      if (row.isCombination) {
        let label = ''
        row.value.length && row.value.forEach((item: any) => {
          label += get_label.call(this, item, printData, bool)
        })
        row.label = label
      } else {
        if (row.value === '_sn' && bool) {
          row.label = num
          num++
        } else {
          if (printData[row.value] !== null) {
            if (this.custom.hasOwnProperty(row.value)) {
              row.label = this.custom[row.value](printData[row.value])
            } else {
              row.label = `${printData[row.value]}`
            }
          } else {
            row.label = ''
          }
        }
      }
      tag = '<div style="position:absolute ;' + single + '">' + row.label + '</div>'
    } else {
      switch (row.value) {
        // 水平线
        case 4:
          tag = '<div style="position:absolute ;' + single + 'border-top:1px solid black;border-bottom:1px solid black;height: 0;"></div>'
          break
        // 垂直线
        case 5:
          tag = '<div style="position:absolute ;' + single + 'border-left:1px solid black;border-right:1px solid black;width: 0;"></div>'
          break
        // 虚线
        case 6:
          tag = '<div style="position:absolute ;' + single + 'border-top:1px dashed black;height: 0;"></div>'
          break
        // 条形码
        case 7:
          if (printData[row.label]) {
            row.label = printData[row.label]
          } else {
            row.label = ''
          }
          // let barsrc = get_bar_code(row.label, !!row.showFont)
          tag = '<img  src="' + get_bar_code(row.label, !!row.showFont) + '" style="position:absolute ;' + single + '">'
          break
        // 二维码
        case 8:
          let label = ''
          row.label.length && row.label.forEach((item: any) => {
            label += get_label.call(this, item, printData, bool)
          })
          label = utf16to8(label)
          // let src = get_qr_code(label)
          tag = '<img  src="' + get_qr_code.call(this, label) + '" style="position:absolute ;' + single + '">'
          break
      }
    }
    arr.push(tag)
  })
  return arr
}

// 渲染单个标签字段
function get_label(this: any, item: any, printData: any, bool: any): string {
  let label = ''
  switch (item.value) {
    case -1:// '${input}'
    case -2:// '\n'
    case -3:// ';'
      label = `${item.input}`
      break
    default: // 可自定义label显示
      if (printData[item.value] !== null) {
        let prefix = item.checked ? `${item.label}:` : ''
        label = prefix + (this.custom.hasOwnProperty(item.value) ? this.custom[item.value] && this.custom[item.value](printData[item.value], bool) : printData[item.value])
      }
  }
  return label
}

function get_bar_code(value: string, bool: boolean): any {
  let bar = document.createElement('img')
  JsBarcode(bar, value, { displayValue: bool, fontSize: 32, margin: 3 })
  return bar.src
}

function get_qr_code(this: any, value: string): any {
  value = this.qrCode ? this.qrCode(value) : value;
  let qr = document.createElement('canvas')
  const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel['L'])
  qrcode.addData(value)
  qrcode.make()
  const canvas = qr
  const ctx: any = canvas.getContext('2d')
  const cells = qrcode.modules
  const tileW = 80 / cells.length
  const tileH = 80 / cells.length
  const scale = (window.devicePixelRatio || 1) / get_backing_store_pixel_ratio(ctx)
  canvas.height = canvas.width = 80 * scale
  ctx.scale(scale, scale)
  cells.forEach((row: any, rdx: any) => {
    row.forEach((cell: any, cdx: any) => {
      ctx.fillStyle = cell ? '#000000' : '#FFFFFF'
      const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
      const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
      ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
    })
  })
  let qrCode = canvas.toDataURL('image/png')
  return qrCode
}
function get_backing_store_pixel_ratio(ctx: any): any {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  )
}

function utf16to8(str: string) {
  var out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

// 用来计算因为tranform的偏移量
function get_location(fontSize: number, size: number, direction: any) {
  let userAgent = window.navigator.userAgent
  if (userAgent.indexOf('Chrome') >= 0) {
    if (fontSize < 12) {
      direction += Number((fontSize / 12).toFixed(5)) * size / 2
      return direction
    } else {
      return direction
    }
  } else {
    return direction
  }
}

function getDPI(): any {
  let screen: any = window.screen
  if (screen.deviceXDPI !== undefined) {
    return { x: screen.deviceXDPI, y: screen.deviceYDPI }
  } else {
    let tmpNode: any = document.createElement('DIV')
    tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
    document.body.appendChild(tmpNode)
    screen.deviceXDPI = parseInt(tmpNode.offsetWidth)
    screen.deviceYDPI = parseInt(tmpNode.offsetHeight)
    tmpNode.parentNode.removeChild(tmpNode)
    return getDPI()
  }
}
let px2pt = function (px: string, decimal = 4) {
  let dpi = getDPI()
  let num = parseInt(px)
  return (num * (72 / dpi.y)).toFixed(decimal)
}

function clone(source: any, target: any = []): any {
  var tmp
  target = target || {}
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      tmp = source[i]
      if (typeof tmp === 'object') {
        target[i] = Array.isArray(tmp) ? [] : {}
        clone(source[i], target[i])
      } else {
        target[i] = tmp
      }
    }
  }
  return target
}

function obj2url(obj: any): any {
  let strs = []

  function value2string(obj: any) {
    switch (typeof obj) {
      case 'object':
        return JSON.stringify(obj)
      // case 'array':
      //   return JSON.stringify(obj)
      default:
        return obj
    }
    // return obj
  }

  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      let templ = ''
      if (typeof obj[i] === 'number') {
        templ = `${i}=${obj[i]}`
      } else {
        templ = `${i}=${encodeURIComponent(value2string(obj[i]))}`
      }
      strs.push(templ)
    }
  }
  return strs.join('&')
}
