import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  use: { baseURL: 'http://localhost:5180', channel: 'msedge', headless: true, viewport: { width: 1600, height: 1000 } },
})
