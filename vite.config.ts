import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 用相對路徑 base ('./'),配合 HashRouter,無論部署喺 /CC2/、/cc2/ 定
// 自訂網域都唔使理大細階,assets 都載入到。本機開發都 work。
export default defineConfig({
  base: './',
  plugins: [react()],
})
