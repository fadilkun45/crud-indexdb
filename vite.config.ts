// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//       proxy: {
//         '/data': {
//           target: 'http://localhost:1900',
//           changeOrigin: true,
//           // rewrite: (path) => path.replace(/^\/data/, ''),
//         },
//       },
//     },
// });


import { defineConfig, loadEnv } from "vite";
import react from '@vitejs/plugin-react-swc'
import jsconfigPaths from "vite-jsconfig-paths";
import vitePluginSvgr from "vite-plugin-svgr";



export default ({mode}) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const env = loadEnv(mode, process.cwd(), "");

  const config = {
    plugins: [react(), jsconfigPaths(), vitePluginSvgr({
      svgrOptions: {
          icon: true
      }
  })],
  define: {
          "process.env": env,
        },
        server: {
          proxy: {
            '/data': {
              target: 'http://localhost:1900',
              changeOrigin: true,
              secure: false,
              // rewrite: (path) => path.replace(/(http?:\/\/[^/]+\/[^/]+\/[^/]+).*/, ''), // Opsional, untuk menghilangkan '/api' dari permintaan
            },
          }
          }
 
  }

  return defineConfig(config);

}