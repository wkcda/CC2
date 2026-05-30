import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 專案網址係 https://<user>.github.io/cc2/
// 所以 production build 嘅 base 要設成 "/cc2/"。本機開發維持 "/"。
// 如果之後改 repo 名或者用自訂網域,改呢度個 base 就得。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/cc2/' : '/',
  plugins: [react()],
}))
