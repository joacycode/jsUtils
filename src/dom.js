/*
 * @Author: zhangxiao774
 * @Date: 2021-04-We 02:30:51
 * @Last Modified by:   zhangxiao774
 * @Last Modified time: 2021-04-We 02:30:51
 */

export default {
  getDom (selector) {
    var type = selector.substring(0, 1)
    if (type === '#') {
      if (document.querySelecotor) return document.querySelector(selector)
      return document.getElementById(selector.substring(1))
    } else if (type === '.') {
      if (document.querySelecotorAll) return document.querySelectorAll(selector)
      return document.getElementsByClassName(selector.substring(1))
    } else {
      return document[document.querySelectorAll ? 'querySelectorAll' : 'getElementsByTagName'](selector)
    }
  },
  /* 检测类名 */
  hasClass (ele, name) {
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'))
  },

  /* 添加类名 */
  addClass (ele, name) {
    if (!this.hasClass(ele, name)) ele.className += ' ' + name
  },

  /* 删除类名 */
  removeClass (ele, name) {
    if (this.hasClass(ele, name)) {
      var reg = new RegExp('(\\s|^)' + name + '(\\s|$)')
      ele.className = ele.className.replace(reg, '')
    }
  },

  /* 替换类名 */
  replaceClass (ele, newName, oldName) {
    this.removeClass(ele, oldName)
    this.addClass(ele, newName)
  },

  /* 获取兄弟节点 */
  siblings (ele) {
    console.log(ele.parentNode)
    var chid = ele.parentNode.children; var eleMatch = []
    for (var i = 0, len = chid.length; i < len; i++) {
      if (chid[i] !== ele) {
        eleMatch.push(chid[i])
      }
    }
    return eleMatch
  },

  /* 获取行间样式属性 */
  getByStyle (obj, name) {
    if (obj.currentStyle) {
      return obj.currentStyle[name]
    } else {
      return window.getComputedStyle(obj, null)[name]
    }
  },
  // DOM转字符串
  domToStirng (htmlDOM) {
    var div = document.createElement('div')
    div.appendChild(htmlDOM)
    return div.innerHTML
  },
  /* 字符串转DOM */
  stringToDom (htmlString) {
    var div = document.createElement('div')
    div.innerHTML = htmlString
    return div.children[0]
  },
  // 距离document文档左和上的距离
  offset (ele) {
    const pos = {
      left: 0,
      top: 0
    }
    while (ele) {
      pos.left += ele.offsetLeft
      pos.top += ele.offsetTop
      ele = ele.offsetParent
    }
    return pos
  },
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
  // 返回指定nodetype子元素，默认元素节点
  getChildrenByNodeType (el, ntype = 1) {
    if (typeof +ntype !== 'number') {
      throw new Error("TypeError：'ntype' is not a number")
    }
    var children = el.childNodes
    var arr = []
    var len = children.length
    for (var i = 0; i < len; i++) {
      if (children[i].nodeType === +ntype) {
        arr.push(children[i])
      }
    }
    return arr
  },
  // 判断是否有子元素
  hasChildren (el) {
    var children = el.childNodes
    var len = children.length
    for (var i = 0; i < len; i++) {
      if (children[i].nodeType === 1) {
        return true
      }
    }
    return false
  },
  // 遍历Dom树
  traverse (element, callback) {
    callback(element)
    var list = element.children
    for (var i = 0; i < list.length; i++) {
      this.traverse(list[i], callback)
    }
  },
  // 绑定事件
  addEvent (elem, type, handle) {
    if (elem.addEventListener) { // 非ie和非ie9
      elem.addEventListener(type, handle, false)
    } else if (elem.attachEvent) { // ie6到ie8
      elem.attachEvent('on' + type, function () {
        handle.call(elem)
      })
    } else {
      elem['on' + type] = handle
    }
  },
  // 解绑事件
  removeEvent (elem, type, handle) {
    if (elem.removeEventListener) { // 非ie和非ie9
      elem.removeEventListener(type, handle, false)
    } else if (elem.detachEvent) { // ie6到ie8
      elem.detachEvent('on' + type, handle)
    } else {
      elem['on' + type] = null
    }
  },
  // 获取dom元素指定属性值
  getElemProps (elem, prop) {
    return window.getComputedStyle
      ? window.getComputedStyle(elem, null)[prop]
      : elem.currentStyle[prop]
  }
}
