/*
 * @Author: zhangxiao774
 * @Date: 2021-04-We 06:28:14
 * @Last Modified by:   zhangxiao774
 * @Last Modified time: 2021-04-We 06:28:14
 */
function optionExtend (opts) {
  return {
    path: opts.path,
    domain: opts.domain,
    expires: opts.expires,
    secure: opts.secure !== undefined ? opts.secure : false
  }
}

function stingifyOpts (opts) {
  opts = opts || {}

  let str = ''
  str += opts.path ? ';path=' + opts.path : ''
  str += opts.domain ? ';domain=' + opts.domain : ''
  str += opts.expires ? ';expires=' + opts.expires.toUTCString() : ''
  str += opts.secure ? ';secure' : ''
  return str
}

export default {
  set (key, val, opts) {
    if (typeof key !== 'string' || key === '') return this
    if (typeof val === 'undefined') return this
    if (opts) opts = optionExtend(opts)
    document.cookie = key + '=' + encodeURIComponent(val) + stingifyOpts(opts)
    return this
  },

  get (key) {
    key = '(?:^|; )' + key + '(?:=([^;]*?))?(?:;|$)'
    const reKey = new RegExp(key)
    const res = reKey.exec(document.cookie)
    return res !== null ? decodeURIComponent(res[1]) : null
  },

  all () {
    let cookies = {}
    document.cookie.split(/;\s/).forEach((cookie) => {
      const tmp = cookie.split('=')
      cookies[tmp[0]] = (tmp.length === 2) ? tmp[1] : undefined
    })
    return cookies
  },

  remove (key, opts) {
    opts = opts || {}
    opts.expires = new Date(0)
    return this.set(key, '', opts)
  },

  empty () {
    document.cookie.split(/;\s/)
      .forEach(cookie => this.remove(cookie.split('=')[0] || cookie))
    return this
  },

  isEnabled () {
    return navigator.cookieEnabled
  }
}
