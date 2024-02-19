
// 正整数或者正的小数格式化， 参数值是保留的小数位数,例如： v-positive-num-precision="2"

export default {
    "positive-num-precision": {
        mounted(ele, binding, vnode) {
            let el = ele.tagName === 'INPUT' ? ele : vnode.elm.children[0]
            let isComposition = false  // 输入法是否是中文
            el.compositionStart = function (event) {
                // 输入法开始 Composition（合成）
                isComposition = true;
            }
            el.compositionEnd = function (event) {
                isComposition = false;
                event.target.value= event.target.value.replace(/[^\d.]/g, '')
                // 触发输入事件
                var newEvent = new Event('input', event);
                event.target.dispatchEvent(newEvent);
            }
    
            el.addEventListener('compositionstart', el.compositionStart);
            el.addEventListener('compositionend', el.compositionEnd);
              
    
            el.precisionHandler = function (e) {
                if(isComposition) {
                    return 
                }
                // 1. 保留位数
                let precision = Number.parseFloat(binding.value)
                precision = Number.isNaN(precision) ? 2 : precision
                
                // 2. 匹配整数/小数
                const matched = e.target.value.match(/^[0-9]\d*(\.(\d+)?)?/)
                let val = matched ? matched[0] : null
                if (val !== null) {
                    const ind = val.indexOf('.')
                    // 3. 整数部分
                    const num = ind !== -1 ? Number.parseFloat(val.slice(0, ind)) : val
    
                    // 是否不需要小数
                    if(precision === 0) {
                        val = num
                    }else if (ind !== -1) {
                        // 整数 + 小数
                        val = num + val.slice(ind, ind + precision + 1)
                    }
                }
                e.target.value = val;
            }
    
            // 这里捕获让我们自己定义的事件先执行--vue事件后执行
            el.addEventListener('input', el.precisionHandler, {capture: true})
        },
        unmounted(el) {
            el.removeEventListener('input', el.precisionHandler)
            el.removeEventListener('compositionstart', el.compositionStart)
            el.removeEventListener('compositionend', el.compositionEnd)
        }
    }
}