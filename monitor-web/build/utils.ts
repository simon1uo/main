import path from 'path'

export function getRootPath() {
  return path.resolve(process.cwd())
}

export function getSrcPath(srcName = 'src') {
  return path.resolve(getRootPath(), srcName)
}

export function convertEnv(envOptions: Record<string, any>): ViteEnv {
  const result: any = {}
  if (!envOptions) return result

  for (const envKey in envOptions) {
    let envVal = envOptions[envKey]
    if (['true', 'false'].includes(envVal)) envVal = envVal === 'true'

    if (['VITE_PORT'].includes(envKey)) envVal = +envVal

    result[envKey] = envVal
  }
  return result
}
