import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv, { config } from "dotenv"

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT,
  }
})
