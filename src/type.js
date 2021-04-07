/*
 * @Author: zhangxiao774
 * @Date: 2021-04-We 06:01:18
 * @Last Modified by:   zhangxiao774
 * @Last Modified time: 2021-04-We 06:01:18
 */

/**
* 获取指定对象的类型
* @param  {type} obj 对象
* @return {string}  对象类型值
*/
function getType (obj) {
  return Object.prototype.toString.call(obj)
}
export default {
  /**
 * 判断是否是function
 * @param  {object}  obj 对象
 * @return {Boolean}
 */
  isFunction (obj) {
    return typeof obj === 'function'
  },

  /**
 * 判断是否是Object
 * @param  {object}  obj 对象
 * @return {Boolean}
 */
  isObject (obj) {
    return getType(obj) === '[object Object]'
  },

  /**
 * 判断是否是array
 * @param  {object}  obj 对象
 * @return {Boolean}
 */
  isArray (obj) {
    return getType(obj) === '[object Array]'
  },

  /**
 * 判断是否是undefined
 * @param  {object}  obj 对象
 * @return {Boolean}
 */
  isUndefined (obj) {
    return getType(obj) === '[object Undefined]'
  },

  /**
 * 判断是否是null
 * @param  {object}  obj 对象
 * @return {Boolean}
 */
  isNull (obj) {
    return getType(obj) === '[object Null]'
  },

  /**
 * 判断是否是字符串
 * @param  {object}  obj 对象
 * @return {Boolean}
 */
  isString (obj) {
    return typeof obj === 'string'
  },

  /**
 * 判断是否是布尔类型
 * @param  {object}  obj 对象
 * @return {Boolean}
 */
  isBoolean (obj) {
    return typeof obj === 'boolean'
  },

  /**
 * 判断是否是一个数字
 * @param  {number}  num 数字
 * @return {Boolean}
 */
  isNumber (num) {
    return getType(num) === '[object Number]'
  }
}
