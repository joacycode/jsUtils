/*
 * @Author: zhangxiao774 
 * @Date: 2021-04-We 06:27:48 
 * @Last Modified by:   zhangxiao774 
 * @Last Modified time: 2021-04-We 06:27:48 
 */

export default {
  UNSAFE_copyTextEvent (text) {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly') // 防止弹出软键盘
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    const res = document.execCommand('copy')
    document.body.removeChild(input)
    return res
  },
  async copyTextEvent (text) {
    await navigator?.clipboard?.writeText(text)
  },
  doNotOncontextmenu () {
    document.oncontextmenu = function () {
        return false;
    }
  }
}
