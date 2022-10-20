const toString = Object.prototype.toString

export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`
}

export function isObject(val: any): boolean {
  return !isNull(val) && is(val, 'Object')
}

export function isArray(val: any): boolean {
  return val && Array.isArray(val)
}

export function isString(val: any): boolean {
  return is(val, 'String')
}

export function isNumber(val: any): boolean {
  return is(val, 'Number')
}

export function isBoolean(val: any): boolean {
  return is(val, 'Boolean')
}

export function isDate(val: any): boolean {
  return is(val, 'Date')
}

export function isRegExp(val: any): boolean {
  return is(val, 'RegExp')
}

export function isFunction(val: any): boolean {
  return typeof val === 'function'
}

export function isPromise(val: any): boolean {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isElement(val: any): boolean {
  return isObject(val) && !!val.tagName
}

export function isDef(val: any): boolean {
  return typeof val !== 'undefined'
}

export function isUnDef(val: any): boolean {
  return typeof val === 'undefined'
}

export function isNull(val: any): boolean {
  return val === null
}

export function isEmptyString(val: any): boolean {
  return val === ''
}

// is null or undefined
export function isNullOrUndef(val: any): boolean {
  return isNull(val) || isUnDef(val)
}

// is null/undefined or empty string
export function isNullOrEmptyString(val: any): boolean {
  return isNullOrUndef(val) || isEmptyString(val)
}

export function isEmpty(val: any): boolean {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function ifNull(val: any, def: any = '') {
  return isNullOrEmptyString(val) ? def : val
}

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer
