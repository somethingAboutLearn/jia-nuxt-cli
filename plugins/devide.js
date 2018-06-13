import pcOrMobile from '@/utils/utils.js'

export default (function(doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in win
    ? 'orientationchange'
    : 'resize'
  let recalc = function() {
    if (pcOrMobile(win.navigator.userAgent) === 'pc') {
      docEl.setAttribute('pc', '')
      docEl.removeAttribute('mobile', '')
    } else {
      docEl.setAttribute('mobile', '')
      docEl.removeAttribute('pc', '')
    }
  }
  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)