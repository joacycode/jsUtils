/*
 * @Author: zhangxiao774
 * @Date: 2021-04-We 06:28:21
 * @Last Modified by:   zhangxiao774
 * @Last Modified time: 2021-04-We 06:28:21
 */

import _cookie from './cookie'
export default {
/**
 * 判断当前环境是否是 app
 * @param  {string}  name app 名称，支持名字 [ wx, qq, weibo, jd ]
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isRefApp (name, ua) {
    ua = ua || navigator.userAgent
    if (name === 'wx') return /micromessenger/i.test(ua)
    if (name === 'qq') return /qq\//i.test(ua)
    if (name === 'weibo') return /weibo/i.test(ua)
    if (name === 'jd') return /^jdapp/i.test(ua)
    if (name === 'jdlittle') return /^jdltapp/i.test(ua)
    if (name === 'mp') {
      return (
        (navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i)) || window.__wxjs_environment === 'miniprogram'
      )
    }
    return false
  },

  /**
 * 判断是否为 android 设备, iOS jdapp内的webview有'android'字样
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isAndroid (ua) {
    ua = ua || navigator.userAgent
    return /android/i.test(ua) && !this.isIOS()
  },

  /**
 * 判断是否为 ios 设备
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isIOS (ua) {
    ua = ua || navigator.userAgent
    return /ip(hone|od)|ipad/i.test(ua)
  },

  /**
 * 判断是否为平板设备
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isTablet (ua) {
    ua = ua || navigator.userAgent
    return /ipad/i.test(ua) || (/android/i.test(ua) && !/mobi|mini|fennec/i.test(ua))
  },

  /**
 * 判断是否为手机设备
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isMobile (ua) {
    ua = ua || navigator.userAgent
    return !!ua.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/i)
  },

  /**
 * 判断是否为iphone
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isIPhone (ua) {
    ua = ua || navigator.userAgent
    return !!ua.match(/iphone/i)
  },

  /**
 * 判断是否为iPad
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isIPad (ua) {
    ua = ua || navigator.userAgent
    return !!ua.match(/ipad/i)
  },

  /**
 * 判断是否为jdApp内的WKWebview
 * @param  {string}  name webview 名称，支持名字 [ xview, wk ]
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  isWebview (name, ua) {
    ua = ua || navigator.userAgent
    if (name === 'xview') return typeof window.XView !== 'undefined'
    if (name === 'wk') return !!ua.match(/supportjdshwk/i) || window._is_jdsh_wkwebview === 1
    return false
  },

  /**
 * 返回网络类型
 * @param  {string}  [ua]   userAgent 字符串
 * @return {string}
 */
  getNetwork (ua) {
    ua = ua || navigator.userAgent
    let re = /nettype\/([\S]*)/i

    if (this.isRefApp('jd', ua)) { re = /network\/([^;]*)/i }

    return re.test(ua) ? RegExp.$1.toLowerCase() : 'unknown'
  },

  /**
 * getNewUUID
 * 获取新uuid返回体
 * @param {String} pua 获取ua不传默认取设备ua
 * @returns {Object} 返回对象体
 * eufv {boolean}  uuid是否加密标识
 * eu {string} eu值 uuid不加密值为空
 * fv {string} fv值 uuid不加密值为空
 * uuid {string} uuid值 根据是否加密标识  决定是否是加密值
 */
  getNewUUID (pua) {
    const ua = pua || window.navigator.userAgent
    if (!this.isRefApp('jd', ua)) return { eufv: false, uuid: _cookie.get('mba_muid') || '' }
    const uuid = ua.split(';')[4]
    if (ua.indexOf('eufv/1') > -1 && uuid.indexOf('-') > -1) { // 加密
      const uuidArr = uuid.split('-')
      return {
        eufv: true,
        eu: uuidArr[0] || '',
        fv: uuidArr[1] || '',
        uuid
      }
    } else {
      return {
        eufv: false,
        uuid
      }
    }
  },

  /**
 * 获取 jd app 的 uuid
 * @param  {string}  [ua]   userAgent 字符串
 * @return {string}
 */
  getUUID (ua) {
    ua = ua || navigator.userAgent
    if (!this.isRefApp('jd', ua)) return null
    return ua.split(';')[4]
  },

  /**
 * 获取 app 版本信息
 * @param  {string}  appName app 名称，支持名字 [ wx, qq, jd ]
 * @param  {string}  [ua]   userAgent 字符串
 * @return {Boolean}
 */
  getAppVersion (appName, ua) {
    ua = ua || navigator.userAgent

    if (appName === 'jd') return ua.split(';')[2] || null
    if (appName === 'wx') return /micromessenger\/([\S]*)/i.test(ua) ? RegExp.$1 : null
    if (appName === 'qq') return /qq\/([\S]*)/i.test(ua) ? RegExp.$1 : null

    return null
  },

  /**
 * 获取 android 版本号
 * @param {string} [ua] userAgent 字符串
 * @return {string}
 */
  getAndroidVersion (ua) {
    ua = ua || navigator.userAgent
    let match = ua.match(/android\s([0-9.]*)/i)
    return match ? match[1] : 'unknown'
  },

  /**
 * 获取 ios 版本号
 * @param {string} [ua] userAgent 字符串
 * @return {string}
 */
  getIOSVersion (ua) {
    ua = ua || navigator.userAgent
    let match = ua.match(/OS ((\d+_?){2,3})\s/i)
    return match ? match[1].replace(/_/g, '.') : 'unknown'
  }
}
