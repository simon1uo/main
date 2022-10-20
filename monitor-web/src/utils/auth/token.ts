import { lStorage } from '../cache'

const TOKEN_CODE = 'access_token'
const DURATION = 6 * 60 * 60

export function setToken(token: string) {
  lStorage.setItem(TOKEN_CODE, token, DURATION)
}

export function getToken() {
  return lStorage.get(TOKEN_CODE)
}

export function removeToken() {
  return lStorage.removeItem(TOKEN_CODE)
}

export async function refreshAcessToken() {
  const expire: number | null = lStorage.getExpireTime(TOKEN_CODE)

  if (!expire || expire - new Date().getTime() > 1000 * 60 * 30) {
    return
  }

  try {
    // const res: any = await
  } catch {}
}
