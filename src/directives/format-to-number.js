export default {
  'format-to-number': {
    mounted(ele, binding) {
      let el = ele.tagName === 'INPUT' ? ele : ele.querySelector('input')
      let isComposition = false // 输入法是否是中文
      el.compositionStart = function () {
        // 输入法开始 Composition（合成）
        isComposition = true
      }
      el.compositionEnd = function (event) {
        isComposition = false
        event.target.value = event.target.value.replace(/[^\d.-]/g, '')
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
        const matched = e.target.value.match(/(-)?\d*((?<=\d+)\.|\d*)\d*/)
        let val = matched ? matched[0] : null
        if (val !== null) {
          const vals = val.split('.')
          // 3. 整数部分

          // 是否不需要小数
          if (precision === 0) {
            val = vals[0]
          } else {
            if (vals.length == 2) {
              // 整数 + 小数
              val = vals[0] + '.' + vals[1].slice(0, precision)
            } else {
              val = vals[0]
            }
          }
        }
        e.target.value = getRangeVal(val, min, max)
      }

      el.blurHandler = (ev) => {
        const str = ev.target.value ? String(ev.target.value).trim() : ''
        if (str == '-') {
          ev.target.value = ''
          ev.target.dispatchEvent(new Event('input', ev))
        } else if (str[str.length - 1] == '.') {
          ev.target.value = str.split('.')[0]
          ev.target.dispatchEvent(new Event('input', ev))
        }
      }

      // 这里捕获让我们自己定义的事件先执行--vue事件后执行
      el.addEventListener('input', el.precisionHandler, { capture: true })
      el.addEventListener('blur', el.blurHandler, { capture: true })
    },
    unmounted(el) {
      el.removeEventListener('input', el.precisionHandler)
      el.removeEventListener('blur', el.blurHandler)
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
