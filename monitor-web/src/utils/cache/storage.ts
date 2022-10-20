import { decrypto, encrypto } from '@/utils/common/crypto'

interface StorageData {
  key: string
  value: any
  expire: number | null
}

export interface StorageOption {
  prefixKey: string
  storage: Storage
}

// default expire time is 7 days
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

class Storager {
  prefixKey: string
  storage: Storage

  constructor(option: StorageOption) {
    this.prefixKey = option.prefixKey
    this.storage = option.storage
  }

  getKey(key: string): string {
    return `${this.prefixKey}${key}`.toUpperCase()
  }

  setItem(key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME) {
    const storageData: StorageData = {
      key: this.getKey(key),
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    }

    const jsonEncryptData = encrypto(storageData)
    this.storage.setItem(storageData.key, jsonEncryptData)
  }

  get(key: string) {
    return this.getItem(key, {})
  }

  getItem(key: string, def: any = null) {
    const jsonEncryptData = this.storage.getItem(this.getKey(key))
    if (jsonEncryptData) {
      let storageData: StorageData | null = null
      try {
        storageData = decrypto(jsonEncryptData)
      } catch {}

      if (storageData) {
        const { value, expire } = storageData
        if (expire === null || expire >= Date.now()) {
          return value
        }
        this.removeItem(key)
        return def
      }
    }
  }

  getExpireTime(key: string): number | null {
    const jsonEncryptData = window.localStorage.getItem(this.getKey(key))
    if (jsonEncryptData) {
      let storageData: StorageData | null = null

      try {
        storageData = decrypto(jsonEncryptData)
      } catch {}
      if (storageData) {
        const { expire } = storageData
        return expire
      }
      return null
    }
    return null
  }

  removeItem(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  clearStorage() {
    this.storage.clear()
  }
}

export function createStorage({ prefixKey = '', storage = sessionStorage }) {
  return new Storager({ prefixKey, storage })
}
