import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

// 拓展setup插件，支持在script标签使用name属性
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// rollup打包分析插件
import { visualizer } from 'rollup-plugin-visualizer'

// vite-html-plugin
import { configHtmlPlugin } from './html'

// unocss
import { configUnocss } from './unocss'

// mock
import { configMock } from './mock'

// unplugins
import unplugin from './unplugin'

// vite compression
import viteCompression from 'vite-plugin-compression'

export function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins = [vue(), VueSetupExtend(), ...unplugin, configHtmlPlugin(viteEnv, isBuild), configUnocss()]

  if (viteEnv.VITE_USE_MOCK) {
    plugins.push(configMock(isBuild))
  }

  if (viteEnv.VITE_USE_COMPRESS) {
    plugins.push(viteCompression({ algorithm: viteEnv.VITE_COMPRESS_TYPE || 'gzip' }))
  }

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    )
  }
  return plugins
}
