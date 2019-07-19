/* eslint-disable import/prefer-default-export */
// 下拉监控
export function isWindowReachBottom(threshold) {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  let scrollHeight = 0;
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  // 获取文档元素的内容垂直滚动的像素数
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
  let windowHeight = 0;
  // 判断当前文档的渲染模式是混杂模式还是"标准模式"
  if (document.compatMode === 'CSS1Compat') {
    // “标准模式”或者“准标准模式(almost standards mode)”
    windowHeight = document.documentElement.clientHeight;
  } else {
    // 混杂模式,值为"BackCompat"
    windowHeight = document.body.clientHeight;
  }
  // 若文档内容垂直滚动像素 + 当前窗口高度的像素 === document.body.scrollHeight或document.documentElement.scrollHeight返回Promise对象，执行后续操作
  if (scrollTop + windowHeight + threshold >=scrollHeight) {
    // callBack()
    return true;
  }
  return false;
}
