import { mechanismType } from '@types'
import { AxiosError } from 'axios'

/**
 * 获取错误的类型
 * @param event JS 异常、静态资源异常、跨域异常
 * @returns
 */
export function getErrorKey(event: ErrorEvent | Event) {
  // const isJsError = event instanceof ErrorEvent;
  // if (!isJsError) return mechanismType.RS;

  // 有 e.target.src(href) 的认定为资源加载错误
  const target = event.target
  // const isElementTarget: boolean = target && (target.src || target.href);
  const isElementTarget: boolean =
    target instanceof HTMLScriptElement ||
    target instanceof HTMLLinkElement ||
    target instanceof HTMLImageElement
  if (isElementTarget) {
    return mechanismType.RS
  }
  if (event instanceof AxiosError) {
    return mechanismType.CS
  }
  // return event.message === 'Script error.' ? mechanismType.CS : mechanismType.JS;
  return mechanismType.JS
}

/**
 * 获取用户最后一个交互事件
 * @returns
 */
export function getLastEvent() {
  let lastEvent: Event
  ;[
    'click',
    'mousedown',
    // 'mouseover',
    'keydown',
    'touchstart'
  ].forEach((eventType) => {
    window.addEventListener(
      eventType,
      (event) => {
        lastEvent = event
      },
      {
        capture: true,
        passive: true // 默认不阻止默认事件
      }
    )
  })
  return lastEvent
}

/**
 * 获取选择器
 * @param pathsOrTarget
 * @returns
 */
export function getSelector(pathsOrTarget: any) {
  console.log('params', pathsOrTarget)

  const handleSelector = function (pathArr: any) {
    return pathArr
      .reverse()
      .filter((element: any) => {
        // 去除 document 和 window
        return element !== document && element !== window
      })
      .map((element: any) => {
        const { id, className, tagName } = element
        if (id) {
          return `${tagName.toLowerCase()}#${id}`
        } else if (className && typeof className === 'string') {
          return `${tagName.toLowerCase()}.${className}`
        } else {
          return tagName.toLowerCase()
        }
      })
      .join(' ')
  }

  if (Array.isArray(pathsOrTarget)) {
    return handleSelector(pathsOrTarget)
  } else {
    const pathArr = []
    while (pathsOrTarget) {
      pathArr.push(pathsOrTarget)
      pathsOrTarget = pathsOrTarget.parentNode
    }
    return handleSelector(pathArr)
  }
}

// 根据行数获取源文件行数 todo
export async function getPosition(lineno, colno) {
  // console.log('@@@@@', sourcemap)
  // var sourceMap = require('source-map');
  // var rawSourceMap = require(sourcemap);
  // sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {
  //   console.log("originalPositionFor: ", "\n", consumer.originalPositionFor({     source: "./",     line: 10,     column: 74647   }));
  // });
  //
  // const sourceData = await LoadSourceMap("monitor.js.map")
  // const fileContent = sourceData.data;
  //
  // const consumer = await new sourceMap.SourceMapConsumer(fileContent);
  //
  // const position = consumer.originalPositionFor({
  //   line: lineno,
  //   column: colno
  // })
  //
  // console.log('@@源文件及错误行和列', position);
  //
  // // if (!position.source) return;
  //
  // // position.content = consumer.sourceContentFor(position.source)
  //
  // const co = consumer.sourceContentFor(position.source);
  // // co 包含了源文件所有的源码
  // const coList = co.split("\n");
  // // 按需取行即可
  // console.log('coList', coList)
  //
  // return position;
}
