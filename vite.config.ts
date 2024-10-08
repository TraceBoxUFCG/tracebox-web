import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Components(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate']
        },
        {
          zod: ['z']
        },
        {
          from: '@/types/',
          imports: [
            'Supplier',
            'Address',
            'PaginatedResponse',
            'Product',
            'Packaging',
            'Asset',
            'GenerateAssetTagPayload',
            'ProductVariety',
            'PurchaseOrder',
            'PurchaseOrderItem',
            'PurchaseOrderCart',
            'PurchaseOrderItemCart',
            'Stock',
            'TransactionMetaEntry',
            'Transaction',
            'TransactionMeta',
            'StockDetails'
          ],
          type: true
        }
      ],
      dts: true,
      viteOptimizeDeps: true,
      dirs: ['src/stores', 'src/types']
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (element) => element.startsWith('iconify-icon')
        }
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
