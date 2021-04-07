/*
 * @Author: zhangxiao774
 * @Date: 2021-04-We 11:18:13
 * @Last Modified by:   zhangxiao774
 * @Last Modified time: 2021-04-We 11:18:13
 */

export default {
  isEmail (sEmail) {
    var reg = /^([\w+\.])+@\w+([.]\w+)+$/
    return reg.test(sEmail)
  },
  isCNPhoneNum (phone) {
    var reg = /^1\d{10}$/
    return reg.test(phone)
  }
}
