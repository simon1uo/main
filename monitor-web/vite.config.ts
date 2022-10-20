import { ConfigEnv, defineConfig, loadEnv } from 'vite'

import { convertEnv, getRootPath, getSrcPath } from './build/utils'
import { createViteProxy } from './build/config/proxy'
import { setupVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
  const isBuild = configEnv.command === 'build'
  const srcPath = getSrcPath()
  const rootPath = getRootPath()

  const viteEnv = convertEnv(loadEnv(configEnv.mode, process.cwd()))

  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_USE_PROXY, VITE_PROXY_TYPE } = viteEnv
  return {
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: false,
      proxy: createViteProxy(VITE_USE_PROXY, VITE_PROXY_TYPE as ProxyType),
    },
    plugins: setupVitePlugins(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
