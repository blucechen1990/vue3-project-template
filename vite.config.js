import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    // 按需导入时自定义主题
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/assets/theme/index.scss" as *;`, // 主题文件
      },
    },
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    // 自动导入组件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }), // end-自动导入组件

    // scss按需导入
    ElementPlus({
      useSource: true,
    }),
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
