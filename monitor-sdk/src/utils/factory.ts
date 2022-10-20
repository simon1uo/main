// 创建对象工厂 utils
import {
  CorsError,
  JsError,
  PromiseError,
  ResourceError
} from '@monitor/class/'
import { mechanismType } from '@types'
import { getPosition, getSelector } from './getters'

/**
 * 创建 JS 异常对象
 * @param message
 * @param type
 * @param filename
 * @param lineno
 * @param colno
 * @param selector
 * @returns
 */
export function createJsError(
  message: any,
  type: any,
  filename: any,
  lineno: any,
  colno: any,
  selector: any
) {
  // todo sourceMap
  const obj = getPosition(lineno, colno)
  console.log('obj', obj)

  return new JsError(
    message,
    type,
    mechanismType.JS,
    filename,
    `${lineno}:${colno}`,
    selector
  )
}

/**
 * 创建 resource error 对象
 * @param event
 * @param src
 * @param outerHTML
 * @param tagName
 * @returns
 */
export function createResourceError(
  event: any,
  src: string,
  outerHTML: any,
  tagName: any
) {
  return new ResourceError(
    event.type,
    src,
    `GET ${src} net::ERR_CONNECTION_REFUSED`,
    outerHTML,
    mechanismType.RS,
    tagName,
    getSelector(event.path)
  )
}

/**
 * 创建 cors error 对象
 * @param name
 * @param message
 * @param url
 * @param method
 * @param response
 * @param request
 * @param params
 * @param data
 * @returns
 */
export function createCorsError(
  name: string,
  message: string,
  url: string,
  method: string,
  response: any,
  request: any,
  params: any,
  data: any
) {
  return new CorsError(
    mechanismType.CS,
    name,
    message,
    url,
    method,
    response.status,
    response ? JSON.stringify(response) : '',
    request ? JSON.stringify(request) : '',
    { query: params, body: data }
  )
}

/**
 * 创建 Promsie error 对象
 * @param message
 * @param event
 * @param filename
 * @param line
 * @param column
 * @param selector
 * @returns
 */
export function createPromiseError(
  message: string,
  event: any,
  filename: string,
  line: number,
  column: number,
  selector: any
) {
  return new PromiseError(
    message,
    event.type,
    mechanismType.UJ,
    filename,
    `${line}:${column}`,
    selector
  )
}
