import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  proxy: {
    // '/api01':{
    //     target:'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
    //     changeOrigin:true,
    //     pathRewrite:{
    //         '^/api01':''
    //     }
    // },
  }
})



