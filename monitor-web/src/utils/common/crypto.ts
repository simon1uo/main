import CryptoJS from 'crypto-js'

const CryptoSecret = '__SecretKey__'

/**
 * encrypt data
 * @param data
 */
export function encrypto(data: any) {
  const jsonData = JSON.stringify(data)
  return CryptoJS.AES.encrypt(jsonData, CryptoSecret).toString()
}

/**
 * decrypt data
 * @param cipherText
 */
export function decrypto(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  if (originalText) {
    return JSON.parse(originalText)
  }

  return null
}
