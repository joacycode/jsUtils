/*
 * @Author: zhangxiao774
 * @Date: 2021-04-We 06:28:04
 * @Last Modified by:   zhangxiao774
 * @Last Modified time: 2021-04-We 06:28:04
 */
const splitOnFirst = (string, separator) => {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`')
  }

  if (separator === '') {
    return [string]
  }

  const separatorIndex = string.indexOf(separator)

  if (separatorIndex === -1) {
    return [string]
  }

  return [
    string.slice(0, separatorIndex),
    string.slice(separatorIndex + separator.length)
  ]
}
export default {
  /**
 * 获取 URL 参数
 *
 * @param  {string} [url] url 地址，默认取当前浏览器地址参数
 * @param  {string|array} name 希望获取的参数名称
 * @return {string|object}
 */
  getUrlQuery (url, name) {
    let getQueryParameters = function (str) {
      str = (str || window.location.search).replace(/(^\?)/, '')

      // 如果str不是字符串 返回空对象
      if (typeof str !== 'string') return {}

      // 如果str为空，则返回空对象
      if (!str) return {}

      return str.split('&').map(function (kv) {
        kv = splitOnFirst(kv, '=')
        this[kv[0]] = kv[1]
        return this
      }.bind({}))[0]
    }

    if (arguments.length === 1 && url.indexOf('=') < 0) {
      name = url
      url = null
    }

    let obj = getQueryParameters(url)

    if (!name) return obj

    if (Object.prototype.toString.call(name) === '[object Array]') {
      let result = {}
      for (let i = 0; i < name.length; i++) {
        result[name[i]] = obj[name[i]] || null
      }
      return result
    } else {
      return obj[name]
    }
  },

  /**
 * 序列化对象
 *
 * @param  {object} data 需要序列化的对象
 * @return {string}
 */
  serialize (data) {
    return Object.keys(data).map(key => key + '=' + data[key]).join('&')
  }

}
