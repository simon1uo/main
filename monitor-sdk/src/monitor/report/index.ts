const timer = null

export function lazyReport(interfaceUrl: string, param): void {
  const cookie: string = window['_monitor_user_cookie_']
  const delay: number = window['_monitor_delay_']

  console.log('lazyReport info', interfaceUrl, param)

  const logParams = {
    cookie, // 用户id
    interfaceUrl, // 例如 error/action/visit/user
    data: param, // 上报的数据
    currentTime: new Date().getTime(),
    currentPage: window.location.href,
    ua: window.navigator.userAgent
  }

  return index(interfaceUrl, logParams)
}

export function index(interfaceUrl: string, data: object): void {
  const url = window['_monitor_report_url_'] || 'http://localhost:8000/report'

  // ------- fetch方式上报 -------
  // 跨域问题
  // fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(res => {
  //   console.log(res);
  // }).catch(err => {
  //   console.error(err);
  // })

  // ------- navigator/img方式上报 -------
  // 不会有跨域问题
  if (navigator.sendBeacon) {
    console.log(`${url}${interfaceUrl}`);
    // 支持sendBeacon的浏览器
    navigator.sendBeacon(`${url}${interfaceUrl}`, JSON.stringify(data))
  } else {
    // 不支持sendBeacon的浏览器
    const oImage = new Image()
    oImage.src = `${url}${interfaceUrl}?logs=${data}`
  }
  // clearCache();
}
