import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://b0d9-197-59-46-82.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
