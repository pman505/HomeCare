import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: true,
    proxy: {
      '/api': {
        // target: 'https://localhost:7290',
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5109',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })

