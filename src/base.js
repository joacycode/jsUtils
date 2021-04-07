/*
 * @Author: zhangxiao774
 * @Date: 2021-04-We 11:46:04
 * @Last Modified by:   zhangxiao774
 * @Last Modified time: 2021-04-We 11:46:04
 * @des base string|array|object|date
 */

export default {
  getDateTime () {
    function prefixTime (i) {
      if (i >= 0 && i < 10) {
        i = '0' + i
      }
      return i
    }
    function prefixMillTime (i) {
      if (i >= 0 && i < 10) {
        i = '00' + i
      } else if (i < 100) {
        i = '0' + i
      }
      return i
    }
    var date = new Date()
    return {
      year: date.getFullYear(),
      month: prefixTime(date.getMonth() + 1),
      day: prefixTime(date.getDate()),
      hour: prefixTime(date.getHours()),
      minute: prefixTime(date.getMinutes()),
      second: prefixTime(date.getSeconds()),
      milliseconds: prefixMillTime(date.getMilliseconds()),
      time: date.getTime(),
      weekday: date.getDay() // 0-6 ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  // 获得视口尺寸
  getViewportOffset () {
    if (window.innerWidth) {
      return {
        w: window.innerWidth,
        h: window.innerHeight
      }
    } else {
      // ie8及其以下
      if (document.compatMode === 'BackCompat') {
        // 怪异模式
        return {
          w: document.body.clientWidth,
          h: document.body.clientHeight
        }
      } else {
        // 标准模式
        return {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        }
      }
    }
  },
  // 插入并加载script脚本
  loadScript (url, callback) {
    var scriptEl = document.createElement('script')
    if (scriptEl.readyState) { // ie8及以下版本
      scriptEl.onreadystatechange = function () {
        if (scriptEl.readyState === 'complete' || scriptEl.readyState === 'loaded') {
          callback()
        }
      }
    } else {
      scriptEl.onload = function () {
        callback()
      }
    }
    scriptEl.src = url
    document.body.appendChild(scriptEl)
  },
  // 防抖
  debounce (handle, delay) {
    var timer = null
    return function () {
      var _self = this
      var _args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
        handle.apply(_self, _args)
      }, delay)
    }
  },
  // 节流
  throttle (handler, wait) {
    var lastTime = 0
    return function (e) {
      var nowTime = new Date().getTime()
      if (nowTime - lastTime > wait) {
        handler.apply(this, arguments)
        lastTime = nowTime
      }
    }
  }
}
