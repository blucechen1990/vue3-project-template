// 正整数或者正的小数格式化， 参数值是保留的小数位数,例如： v-positive-num-precision="2"

export default {
    'positive-num-precision': {
      mounted(ele, binding) {
        let el = ele.tagName === 'INPUT' ? ele : ele.querySelector('input')
        let isComposition = false // 输入法是否是中文
        el.compositionStart = function () {
          // 输入法开始 Composition（合成）
          isComposition = true
        }
        el.compositionEnd = function (event) {
          isComposition = false
          event.target.value = event.target.value.replace(/[^\d.]/g, '')
          // 触发输入事件
          var newEvent = new Event('input', event)
          event.target.dispatchEvent(newEvent)
        }
  
        el.addEventListener('compositionstart', el.compositionStart)
        el.addEventListener('compositionend', el.compositionEnd)
  
        el.precisionHandler = function (e) {
          if (isComposition) {
            e.stopImmediatePropagation()
            return false
          }
          // 1. 保留位数
          // let precision = Number.parseFloat(binding.value)
          // precision = Number.isNaN(precision) ? 2 : precision
          const { precision, max, min } = parseValue(binding.value)
  
          // 2. 匹配整数/小数
          const matched = e.target.value.match(/^[0-9]\d*(\.(\d+)?)?/)
          let val = matched ? matched[0] : null
          if (val !== null) {
            const ind = val.indexOf('.')
            // 3. 整数部分
            let num = Number.parseInt(val)
            // 是否不需要小数
            if (precision === 0) {
              val = num
            } else {
              if (ind !== -1) {
                // 整数 + 小数
                val = num + val.slice(ind, ind + precision + 1)
              } else {
                val = num
              }
            }
          }
          e.target.value = getRangeVal(val, min, max)
        }
  
        // 这里捕获让我们自己定义的事件先执行--vue事件后执行
        el.addEventListener('input', el.precisionHandler, { capture: true })
      },
      unmounted(el) {
        el.removeEventListener('input', el.precisionHandler)
        el.removeEventListener('compositionstart', el.compositionStart)
        el.removeEventListener('compositionend', el.compositionEnd)
      }
    }
  }
  
  function parseValue(bindValue) {
    const obj = {
      precision: 2,
      max: null,
      min: null
    }
    if (typeof bindValue === 'object') {
      obj.precision = bindValue.precision
      obj.max = bindValue.max
      obj.min = bindValue.min
    } else {
      obj.precision = bindValue
    }
  
    return obj
  }
  
  function getRangeVal(val, min, max) {
    if ((min || min === 0) && val < min) {
      val = min
    } else if ((max || max === 0) && val > max) {
      val = max
    }
    return val
  }
  